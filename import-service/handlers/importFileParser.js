const { S3, SQS } = require('aws-sdk');
const csv = require('csv-parser');
const { BUCKET_NAME: Bucket, S3_OPTIONS, SQS_URL } = require('../utils/constants');

module.exports = async function importFileParser(event) {
  const s3 = new S3(S3_OPTIONS);
  const sqs = SQS_URL && new SQS();

  // PROCESS RECORDS
  const results = await Promise.allSettled(
    event.Records.map(
      async (record) => {
        const { key: Key } = record.s3.object;
        try {
          // CREATE STREAM
          const stream = await s3.getObject({ Bucket, Key })
            .createReadStream()
            .pipe(csv({
              headers: ['title', 'description', 'price', 'count'],
            }));
          // PROCESS STREAM DATA
          for await (const data of stream) { // eslint-disable-line no-restricted-syntax
            if (sqs) {
              console.log('... DATA', data, 'for:', Key);
              const MessageBody = JSON.stringify(data);
              await sqs.sendMessage({ QueueUrl: SQS_URL, MessageBody }).promise();
            }
          }
          // MOVE FILE TO PARSED FOLDER
          const parsedKey = Key.replace('uploaded/', `parsed/${(new Date()).toISOString().replace(/:/g, '-')}_`);
          await s3.copyObject({ Bucket, CopySource: `${Bucket}/${Key}`, Key: parsedKey }).promise();
          await s3.deleteObject({ Bucket, Key }).promise();
          // RESULTS
          return { Key, parsedKey };
        } catch (error) {
          return Promise.reject({ Key, error }); // eslint-disable-line prefer-promise-reject-errors
        }
      },
    ),
  );

  const errors = results.filter((result) => result.status === 'rejected');
  if (errors.length) {
    throw new Error(errors
      .map(({ reason: { Key, error } }) => `Parsing file ${Key} was failed with error message: ${error.message}`)
      .join('\n'));
  }
  return results.map(({ value }) => value);
};
