# Task 9 (Backend For Frontend)


#### product-service

- endpoint: https://ojlkuvsx07.execute-api.eu-west-1.amazonaws.com/dev
- all products: https://ojlkuvsx07.execute-api.eu-west-1.amazonaws.com/dev/products/ 
- single product: https://ojlkuvsx07.execute-api.eu-west-1.amazonaws.com/dev/product/030f5ee8-b461-4543-ac4b-103032945249


#### cart-service

- endpoint: http://inshatan-cart-api-dev.eu-west-1.elasticbeanstalk.com
- user cart:  http://inshatan-cart-api-dev.eu-west-1.elasticbeanstalk.com/api/profile/cart

#### *bff-service*

- endpoint: http://inshatan-bff-api-dev.eu-west-1.elasticbeanstalk.com
- all products: http://inshatan-bff-api-dev.eu-west-1.elasticbeanstalk.com/products/products
- single product: http://inshatan-bff-api-dev.eu-west-1.elasticbeanstalk.com/products/product/030f5ee8-b461-4543-ac4b-103032945249
- user cart:  http://inshatan-bff-api-dev.eu-west-1.elasticbeanstalk.com/cart/api/profile/cart

#### Create product

To create product you can use Frontend Application (https://d2v14ttltat414.cloudfront.net).
   
Please use a csv file in the form (example can be found in the file **./products.csv**): 
  
    title,description,price,count
    
 
## Main tasks

* [x] **3** - A working and correct **express** application should be in the **bff-service** folder. Reviewer can start this application locally with any valid configuration in the **.env** file and this application should works as described in the task 9.1
* [x] **5** - The **bff-service** should be deployed with Elastic Beanstalk. The **bff-service** call should be redirected to the appropriate service : **product-service** or **CART**. The response from the **bff-service** should be the same as if **product-service** or **CART** services were called directly.
 
 
## Additional (optional) tasks

* [x] **+1** - Add a cache at the **bff-service** level for a request to the **getProductsList** function of the **product-service**. The cache should expire in 2 minutes.  
How to test:
  * Get products list
  * Create new product
  * Get products list - result shouldn’t have new product
  * Wait more than 2 minutes
  * Get products list - result should have new product
* [x] **+1** - Use **NestJS** to create **bff-service** instead of **express**


