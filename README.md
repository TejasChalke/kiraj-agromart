# Project Setup Instructions

Follow the steps below to set up and run the project:

## 1. Install Packages

First, make sure you have Node.js and npm installed on your machine. Then, install the necessary packages by running the following command in the root directory of your project:
```
npm install
```

## 2. Get an Auth Token
To access the required API, you need to obtain an authentication token. Follow these steps:

1. Go to [GoRest](https://gorest.co.in/).
2. Sign up or log in to your account.
3. Generate an authentication token.

## 3. Create an Environment Variable
Create a .env file in the root directory of your project and add the authentication token you obtained in the previous step. The .env file should contain the following line:
```
REACT_APP_API_KEY=your_token_here
```

Replace your_token_here with the actual token you obtained from GoRest.

## 4. Run the Application
Start the application by running the following command in the root directory of your project:
```
npm start
```

The application should now be running.