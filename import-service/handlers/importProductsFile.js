const AWS = require('aws-sdk');
const response = require('../utils/response');
const { BUCKET_NAME, S3_OPTIONS } = require('../utils/constants');

module.exports = async function importProductsFile(event) {
  const { name } = event.queryStringParameters || {};
  if (!name) {
    return response.json(400, { error: 'Filename is required' });
  }

  try {
    const s3 = new AWS.S3(S3_OPTIONS);
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: BUCKET_NAME,
      Key: `uploaded/${name}`,
      Expires: 60,
      ContentType: 'text/csv',
    });
    return response.text(200, url);
  } catch (error) {
    return response.json(500, { error: error.message });
  }
};
