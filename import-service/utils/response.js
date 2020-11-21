const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

module.exports = {
  headers,
  json: (statusCode, body) => ({
    statusCode,
    headers,
    body: JSON.stringify(body),
  }),
  text: (statusCode, body) => ({
    statusCode,
    headers: {
      ...headers,
      'Content-Type': 'text/html; charset=utf-8',
    },
    body,
  }),
};
