# Task 5


Frontend application: https://d2v14ttltat414.cloudfront.net

Application expects CSV-file without header row in following format: 

    title,description,price

Link for invocation of the lambda function which lists all objects in the parsed folder of the bucket:
https://2qcr7jqr8k.execute-api.eu-west-1.amazonaws.com/dev/list


### Main tasks 

- \+ File serverless.yml contains configuration for importProductsFile function
- \+ The importProductsFile lambda function returns a correct response.

    To try the request, please use the following url: https://2qcr7jqr8k.execute-api.eu-west-1.amazonaws.com/dev/import?name=name
    
- \+ Frontend application is integrated with importProductsFile lambda.
    
    Link to the upload form: https://d2v14ttltat414.cloudfront.net/admin/products
    
- \+ The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda


### Additional tasks 

- \+ async/await is used in lambda functions
- \+ importProductsFile lambda is covered by unit tests 
- \+ At the end of the stream the lambda function moves the file from the uploaded folder into the parsed folder 


