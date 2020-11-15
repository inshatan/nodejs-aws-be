# Task 4

API: https://ojlkuvsx07.execute-api.eu-west-1.amazonaws.com/dev

Frontend application: https://d2v14ttltat414.cloudfront.net


### Main tasks 

- Task 4.1 is implemented.

  File ./db/queries.sql contains sql queries to create tables and insert some data


- Task 4.2 is implemented.

  list of all products: https://ojlkuvsx07.execute-api.eu-west-1.amazonaws.com/dev/products/
  
  one of products: https://ojlkuvsx07.execute-api.eu-west-1.amazonaws.com/dev/product/030f5ee8-b461-4543-ac4b-103032945249


- Task 4.3 is implemented.

  To create new product you should send post request to https://ojlkuvsx07.execute-api.eu-west-1.amazonaws.com/dev/products/

  Swagger documentation can be accessed at https://app.swaggerhub.com/apis/inshatan/node-aws-be/1.0.0

  Swagger file is located at the path ./product-service/swagger.yaml
  
  
- Frontend application is integrated with product service.

   Link to the application https://d2v14ttltat414.cloudfront.net



### Additional tasks 


- \+ POST/products lambda functions returns error 400 status code if product data is invalid

- \+ All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)

- \+ All lambdas do console.log for each incoming requests and their arguments

- \+ Transaction based creation of product
 
