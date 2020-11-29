const basicAuthorizer = require('./handlers/basicAuthorizer');
const cognitoProtectedLambda = require('./handlers/cognitoProtectedLambda');

module.exports = {
  basicAuthorizer,
  cognitoProtectedLambda,
};
