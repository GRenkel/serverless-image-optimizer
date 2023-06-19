import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolConfig = {
    UserPoolId: process.env.REACT_APP_USERPOOL_ID, // Your user pool id here
    ClientId: process.env.REACT_APP_CLIENT_ID, // Your client id here
  };

  export default new CognitoUserPool(userPoolConfig)