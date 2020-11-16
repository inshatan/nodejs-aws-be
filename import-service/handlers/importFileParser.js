const { S3 } = require('aws-sdk');
const csv = require('csv-parser');
const { BUCKET_NAME, S3_OPTIONS } = require('../utils/constants');
const response = require('../utils/response');

module.exports = async function importFileParser(event) {
  try {
    const s3 = new S3(S3_OPTIONS);
    const objects = await Promise.all(
      event.Records.map(async (record) => {
        const Bucket = BUCKET_NAME;
        const { key: Key } = record.s3.object;
        // create stream
        const stream = await s3.getObject({ Bucket, Key }).createReadStream().pipe(csv({
          headers: ['title', 'description', 'price'],
        }));
        // retrieve data
        const list = [];
        for await (const data of stream) { // eslint-disable-line no-restricted-syntax
          console.log('-->', Key, data);
          list.push(data);
        }
        console.log('-- LIST', Key, list);
        // move file to parsed folder
        const parsedKey = Key.replace('uploaded/', `parsed/${(new Date()).toISOString().replace(/:/g, '-')}_`);
        await s3.copyObject({ Bucket, CopySource: `${BUCKET_NAME}/${Key}`, Key: parsedKey }).promise();
        await s3.deleteObject({ Bucket, Key }).promise();
        // results
        return parsedKey;
      }),
    );
    return response.json(202, { objects });
  } catch (error) {
    return response.json(500, { error: error.message });
  }
};
