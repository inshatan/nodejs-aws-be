module.exports = {
  SQS_URL: process.env.SQS_URL,
  BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_OPTIONS: {
    region: 'eu-west-1',
    signatureVersion: 'v4',
  },
};
