const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export default (statusCode, body) => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
});
