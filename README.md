
# 1. What was done

### Main tasks
   
- \+ serverless.yml contains configuration for 2 lambda functions and API is working
- \+ getProductsList: https://ojlkuvsx07.execute-api.eu-west-1.amazonaws.com/dev/products/
- \+ getProductsById: https://ojlkuvsx07.execute-api.eu-west-1.amazonaws.com/dev/product/1/
- \+ Frontend application is integrated with product service: https://d2v14ttltat414.cloudfront.net


### Optional Tasks

- \+ Async/await was used
- \+ ES6 modules were used
- \+ Webpack was configured
- \+ SWAGGER documentation is (https://app.swaggerhub.com/apis/inshatan/node-aws-be/1.0.0)
- \+ Lambda handler getProductById is covered by UNIT tests with JEST
- \+ Lambda handlers were written not in separated files
- \+ Error scenario is handled by API. If there is no product with requested ID the try catch block is used to handle the response.


# 2. Link to product-service API 

https://ojlkuvsx07.execute-api.eu-west-1.amazonaws.com/dev


# 3. LInk to FE MR (in my own repository)

https://github.com/inshatan/nodejs-aws-fe/pull/2


# 4. SWAGGER file

The swagger file is located at the path ./product-service/swagger.yaml
