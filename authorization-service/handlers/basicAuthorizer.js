function createAuthResponse(principalId, Resource, Effect) {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        { Action: 'execute-api:Invoke', Effect, Resource },
      ],
    },
  };
}

module.exports = async function basicAuthorizer(event) {
  console.log('... EVENT', event);

  if (event.type !== 'TOKEN') {
    return 'Unauthorized';
  }

  const { authorizationToken, methodArn } = event;
  const principalId = authorizationToken.split(' ')[1];

  try {
    const buff = Buffer.from(principalId, 'base64');
    const [username, password] = buff.toString('utf-8').split(':');
    const effect = process.env[username] && process.env[username] === password ? 'Allow' : 'Deny';
    return createAuthResponse(principalId, methodArn, effect);
  } catch (error) {
    console.log('... ERROR', error);
    return createAuthResponse(principalId, methodArn, 'Deny');
  }
};
