# front store

## Table of Contents

* [How to set up database](#Howtosetdatabase)

* [dependancies](#dependancies)

* [usage](#usage)

# How to set up database

1- create database in psql  (e_commerce) 

download postgresql in your pc  

take care of this information ( 
    POSTGRES_USER= postgres
    POSTGRES_PASSWORD= 123
    POSTGRES_PORT=5432
   )


open psql write  CREATE DATABASE e_commerce;



# dependancies

you have to be sure that node installed in your PC



# usage


to use the app


 write (npm install) in your terminal 

then (db-migrate up)
then (npm run start) 



##  requests for user

post req on 
localhost:8080/api/users     //to create a new user you have to pass 
email as string &
 name as string & 
  password as string 
  in the body of your request as json
 
post req on
 localhost:8080/api/signin    //to sign in user you have to pass 
 email as string & 
 password as string 
 in the body of your request as json   ,you have to pass a valid token to Bearer


post req on
 localhost:8080/api/update    //to update an user you have to pass 
 updated values
 in the body of your request as json


GET req on
localhost:8080/api/users    //to get all created users you have to pass a valid token to Bearer


GET req on
localhost:8080/api/users/id    //to get specific user  by id you have to pass a valid token to Bearer


delete req on
localhost:8080/api/users/id    //to delete specific user  by id you have to pass a valid token to Bearer


##  requests for products


post req on 
localhost:8080/api/products     //to create a new product you have to pass
 name as string 
  price as number 
  category as string 
  stock as number
  offer as string
  image as string
    in the body of your request as json  ,you have to pass a valid token to Bearer
 

GET req on
localhost:8080/api/products    //to get all created products 


GET req on
localhost:8080/api/products/id    //to get specific product  by id 


##  requests for orders


post req on 
localhost:8080/api/orders     //to create a new order you have to pass
  users_id as number
  status as string 
  in the body of your request as json   ,you have to pass a valid token to Bearer


  post req on 
localhost:8080/api/orders/id/products     //to add a new product to order you have to pass 
  orders_id as number
  products_id as number
   quantity as number
  in the body of your request as json   ,you have to pass a valid token to Bearer


GET req on
localhost:8080/api/orders    //to get all created orders  ,you have to pass a valid token to Bearer


GET req on
localhost:8080/api/orders/id    //to get specific order by id  ,you have to pass a valid token to Bearer


GET req on
localhost:8080/api/orders/users/:id    //to get an order for aspecific user by user id   ,you have to pass a valid token to Bearer