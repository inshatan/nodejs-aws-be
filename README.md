# Task 5


Frontend application: https://d2v14ttltat414.cloudfront.net

Application expects CSV-file without header row in following format: 

    title,description,price



### Main tasks 

- \+ File serverless.yml contains configuration for importProductsFile function
- \+ The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket
- \+ Frontend application is integrated with importProductsFile lambda
- \+ The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda


### Additional tasks 

- \+ async/await is used in lambda functions
- \- importProductsFile lambda is covered by unit tests 
- \+ At the end of the stream the lambda function moves the file from the uploaded folder into the parsed folder 


