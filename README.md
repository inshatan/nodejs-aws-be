# Task 7

Frontend application: https://d2v14ttltat414.cloudfront.net

Basic Authorization Token (inshatan:TEST_PASSWORD):

    aW5zaGF0YW46VEVTVF9QQVNTV09SRA==

To change authorization header please use the following command in the browser console:

    localStorage.setItem('authorization_token', 'aW5zaGF0YW46VEVTVF9QQVNTV09SRA==');

URL for import-service import endpoint:

    https://2qcr7jqr8k.execute-api.eu-west-1.amazonaws.com/dev/import?name=filename


Example CSV-file can be found at ./products.csv

FrontEnd Application pull request: https://github.com/inshatan/nodejs-aws-fe/pull/4


### Main tasks 
    
- [x] 1 - authorization-service is added to the repo, has correct basicAuthorizer lambda and correct serverless.yaml file

- [x] 3 - import-service serverless.yaml file has authorizer configuration for the importProductsFile lambda. Request to the importProductsFile lambda should work only with correct authorization_token being decoded and checked by basicAuthorizer lambda. Response should be in 403 HTTP status if access is denied for this user (invalid authorization_token) and in 401 HTTP status if Authorization header is not provided.
    
- [x] 5 - update client application to send Authorization: Basic authorization_token header on import. Client should get authorization_token value from browser localStorage https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage authorization_token = localStorage.getItem('authorization_token')


### Additional (optional) tasks

- [x] +1 - Client application should display alerts for the responses in 401 and 403 HTTP statuses. This behavior should be added to the nodejs-aws-fe-main/src/index.tsx file


 
### just practice, no evaluation

Lambda function protected by Cognito Authorizer:

    https://tcs7zu6e42.execute-api.eu-west-1.amazonaws.com/dev/protected

Login page URL:

    https://inshatan.auth.eu-west-1.amazoncognito.com/login?client_id=1gqdpaqcaaubjnp4b3l16dcm43&response_type=token&scope=email+openid+phone+profile&redirect_uri=https://d2v14ttltat414.cloudfront.net


How to make sure that everything works as expected:
  * Open login page and **Sign up** a new user. Use a real email address to create this user
  * Verify user using code from the email
  * After verification and after every login you will be redirected to the Client application. URL should contain **id_token** which can be used to access the **getProducts** lambda
  * Call **getProducts** lambda using **id_token** as a value for the **Authorization** header




