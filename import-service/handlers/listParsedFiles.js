const { S3 } = require('aws-sdk');
const { BUCKET_NAME, S3_OPTIONS } = require('../utils/constants');
const response = require('../utils/response');

module.exports = async function listParsedFiles() {
  try {
    const s3 = new S3(S3_OPTIONS);
    const resources = await s3.listObjectsV2({
      Bucket: BUCKET_NAME,
      Prefix: 'parsed/',
    }).promise();
    return response.json(
      202,
      resources.Contents.filter(({ Size }) => Size),
    );
  } catch (error) {
    return response.json(500, { error: error.message });
  }
};
