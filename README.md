# Founders API REST - Final project ISDI Coders

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Jairo-Vidomines-Final-Project-back-202301-bcn&metric=coverage)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Jairo-Vidomines-Final-Project-back-202301-bcn)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Jairo-Vidomines-Final-Project-back-202301-bcn&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Jairo-Vidomines-Final-Project-back-202301-bcn)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Jairo-Vidomines-Final-Project-back-202301-bcn&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Jairo-Vidomines-Final-Project-back-202301-bcn)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Jairo-Vidomines-Final-Project-back-202301-bcn&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Jairo-Vidomines-Final-Project-back-202301-bcn)

Welcome to the Founders API REST! This API allows you to access and manipulate data on the Founders platform. This API is developed using CD/CI.

### Frontend

Founders is a full stack project, you can see the frontend project [here](https://github.com/isdi-coders-2023/Jairo-Vidomines-Final-Project-front-202301-bcn).

## Technology stack

![Typescript](https://img.shields.io/badge/-Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/-NodeJS-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)
![Express validation](https://img.shields.io/badge/-Express%20validation-000000?style=flat-square&logo=express-validation&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/-Supertest-000000?style=flat-square&logo=supertest&logoColor=white)
![JSON Web Token](https://img.shields.io/badge/-JSON%20Web%20Token-000000?style=flat-square&logo=json-web-token&logoColor=white)
![bcrypt](https://img.shields.io/badge/-bcrypt-000000?style=flat-square&logo=bcrypt&logoColor=white)

## Endpoints

Here is a list of the available endpoints:

### Protected Endpoints

These endpoints require authentication. To authenticate your request, you will need to provide a valid JSON Web Token (JWT) in the Authorization header of your request. The value of the Authorization header should be Bearer <YOUR_JWT>.

### /projects/create

This endpoint allows you to create a new project. You can include an avatar with your project by providing the url image file in the request body as form data.

### /projects/:id

This endpoint allows you to view a specific project by its ID. You will need to provide the ID of the project in the URL path.

### /projects/delete/:id

This endpoint allows you to delete a project by its ID. You will need to provide the ID of the project in the URL path.

### /projects

This endpoint allows you to view all projects.

## Unprotected Endpoints

These endpoints do not require authentication.

### /login

This endpoint allows you to log in to your Founders account. You will need to provide your username and password to authenticate your request. Upon successful login, a JSON Web Token (JWT) will be returned that you can use to authenticate future requests.
