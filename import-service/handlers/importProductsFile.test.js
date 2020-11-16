const AWS = require('aws-sdk-mock');
const importProductsFile = require('./importProductsFile');

describe('importProductsFile handler', () => {
  const eventAPIGateway = {
    queryStringParameters: { name: 'test-file-name' },
  };
  const signedUploadUrl = 'test-signed-url';
  AWS.mock('S3', 'getSignedUrl', signedUploadUrl);

  test('should return 400 if file name is not provided', async () => {
    const response = await importProductsFile({});
    expect(response.statusCode).toBe(400);
  });

  test('should return signed url with status code 200', async () => {
    const response = await importProductsFile(eventAPIGateway);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(signedUploadUrl);
    expect(response.headers['Content-Type']).toBe('text/html; charset=utf-8');
  });
});
