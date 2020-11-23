# Task 6

Frontend application: https://d2v14ttltat414.cloudfront.net

Example CSV-file can be found at ./products.csv


### Main tasks 

- \+ product-service/serverless.yml contains configuration for catalogBatchProcess function
- \+ product-service/serverless.yml contains policies for SNS and import-service/serverless.yml contains policies for SQS
- \+ product-service/File serverless.yml contains configuration for SQS catalogItemsQueue
- \+ product-service/serverless.yml contains configuration for SNS Topic createProductTopic and email subscription

### Additional (optional) tasks

- \+ catalogBatchProcess lambda is covered by unit tests
- \+ Filter Policy for SNS is configured based on the MessageAttributes
 




