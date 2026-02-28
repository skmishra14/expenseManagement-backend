# About the project 
This contains backend part for Expense Management 
## Schemas Overview 
- User Scheme 
    - fullName
    - userName
    - email
    - password
    - refreshToken
    - salary
    - role
- Expense Schema 
    - userId (mapped with User Schema)
    - amount 
    - type 
    - categoryId 
    - description
    - isDelete (soft delete flag)
- Category Schema (src/models/category.models.js)
    - name
    - type - investment | expense | income

## Router Overview
- User Router
    - POST ../user/register-user : registers user
    - POST ../user/login-user    : logs user-in
    - POST ../user/logout-user   : logs user-out
    - GET ../user/get-details    : get logged-in user details
- Expense Router
    - POST ../expense/create-expense : create the expense for the user
    - GET ../expense/get-expense     : get all the expense of the user
    - PATCH ../expense/update/:id    : update details of the user
    - PATCH ../expense/delete/:id    : delete user details (soft delete)
- Category Router

## Controllers Overview
- User Controller 
    - registerUser
    - loginUser
    - logoutUser
    - getUserDetails
- Expense Controller
    - createExpense
    - getExpenses
    - updateExpense
    - deleteExpense
- Category Controller

## Middleware Used
- Authentication 

# Setting up project to run locally
- Set up .env file locally
- Set the following in local .env file
    - PORT 
    - MONGO_URI
    - CORS_ORIGIN
    - Access Token Setup
        - ACCESS_TOKEN_SECRET_KEY
        - ACCESS_TOKEN_TIME
    - Refresh Token Setup
        - REFRESH_TOKEN_SECRET_KEY
        - REFRESH_TOKEN_TIME

# Run Project
- npm install
- npm run dev

# Features 
- JWT based Auth
- Filter Expenses
- Pegination of Expense details
- Sorting of Expense details