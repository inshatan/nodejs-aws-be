import { SNS } from 'aws-sdk';
import {
  createClient, queryProduct, queryCreateProduct, validateProductData,
} from '../utils/db';

const successNotification = ({
  id, title, price, count,
}) => ({
  Subject: 'New Product Imported',
  Message: `
    Product ID: ${id}
    title: ${title}
    price: ${price}
    count: ${count}     
  `,
  TopicArn: process.env.SNS_ARN,
  MessageAttributes: {
    productId: {
      DataType: 'String',
      StringValue: id,
    },
    status: {
      DataType: 'String',
      StringValue: 'success',
    },
  },
});

const failNotification = (data, reason) => ({
  Subject: 'Product Import Error',
  Message: `
    Product Data: ${JSON.stringify(data)}
    Failure Reason: ${reason}
  `,
  TopicArn: process.env.SNS_ARN,
  MessageAttributes: {
    status: {
      DataType: 'String',
      StringValue: 'error',
    },
  },
});

export const handler = async (event) => {
  const sns = new SNS({ region: process.env.SRV_REGION });

  // PROCESS RECORDS
  const results = await Promise.allSettled(
    event.Records.map(
      async ({ body }) => {
        const record = JSON.parse(body);
        try {
          // validate product
          validateProductData(record);
          // TODO: check duplicates
        } catch (error) {
          console.log('... NOT VALID', error);
          // send error notification
          await sns.publish(failNotification(record, error.message)).promise();
          return;
        }
        const client = createClient();
        try {
          // add product
          await client.connect();
          const productId = await queryCreateProduct(client, record);
          const product = await queryProduct(client, productId);
          // send notification
          await sns.publish(successNotification(product)).promise();
          // results
          console.log('... PRODUCT', productId);
          return productId; // eslint-disable-line consistent-return
        } finally {
          await client.end();
        }
      },
    ),
  );

  // RESULTS
  const errors = results.filter((result) => result.status === 'rejected');
  if (errors.length) {
    throw new Error(
      errors.map(({ reason }) => reason.toString()).join('\n'),
    );
  }
  return results.map(({ value }) => value);
};
