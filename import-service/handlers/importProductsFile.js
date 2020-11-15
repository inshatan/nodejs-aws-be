const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

module.exports = async function importProductsFile(event) {
  console.log('triggered');
  console.log(event);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      data: 'triggered',
      path: event.pathParameters,
    }),
  };
};
