import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, } from "amazon-cognito-identity-js";
import CognitoUserPool from "./CognitoUserPool";
import EAuthStatus from './EAuthStatus.json'
import { CognitoIdentityCredentials } from "aws-sdk";

export const CognitoAPIHelper = {
  currentCognitoUser: null,
  currentCognitoUserIdToken: null,
  currentCognitoUserAcessToken: null,
  currentCognitoIdentityPoolCredentials: null,

  setCurrentCognitoUser: function (cognitoUser) {
    return this.currentCognitoUser = cognitoUser
  },

  setCurrentCognitoUserAccessToken: function (token) {
    return this.currentCognitoUserAcessToken = token
  },
  
  setCurrentCognitoUserIdToken: function (token) {
    return this.currentCognitoUserIdToken = token
  },

  setCurrentCognitoUserByEmail: function (UserIdentification) {

    const userData = {
      Username: UserIdentification,
      Pool: CognitoUserPool,
    }
    return this.currentCognitoUser = new CognitoUser(userData);
  },

  getCognitoAuthStatus: function (code) {
    return EAuthStatus[code] !== undefined ? EAuthStatus[code] : EAuthStatus.failedToLogin
  },

  getCognitoAttributesArrayFromObject: function (attributesObject) {
    let cognitoAttributes = []
    for (const attribute in attributesObject) {
      cognitoAttributes.push(
        new CognitoUserAttribute({
          Name: attribute,
          Value: attributesObject[attribute]
        })
      )
    }
    return cognitoAttributes
  },

  getUserAttributesFromCognitoAttributesArray: function (attributesArray = []) {
    let cognitoAttributes = {}
    attributesArray.forEach(attribute => cognitoAttributes[attribute.Name] = attribute.Value)
    return cognitoAttributes
  },

  getCredentialsCognitoIdentityPool: function () {
    return this.currentCognitoIdentityPoolCredentials
  },

  setCredentialsFromCognitoIdentityPool: async function () {
    try {
      const region = process.env.REACT_APP_AWS_REGION
      const cognitoId = `cognito-idp.${region}.amazonaws.com/${process.env.REACT_APP_USERPOOL_ID}`
      const cognitoIdentityCredentials = {
        Logins: {},
        IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
      }
      cognitoIdentityCredentials.Logins[cognitoId] = this.currentCognitoUserIdToken

      const credentials = new CognitoIdentityCredentials(cognitoIdentityCredentials, { region });

      return new Promise((resolve, reject) => credentials.get((err) => {
        if (err) { reject(err) }
        this.currentCognitoIdentityPoolCredentials = { region: region, credentials }
        resolve()
      }))
    } catch (error) {
      const errorMessage = 'Error getting Credentials from Cognito Identity Pool'
      console.log(errorMessage, error)
      throw new Error(errorMessage);
    }
  },

  async getCurrentUserSession() {
    const currentUser = CognitoUserPool.getCurrentUser();
    this.setCurrentCognitoUser(currentUser);

    if (!this.currentCognitoUser) {
      throw new Error('User is not authenticated!');
    }

    try {
      const session = await new Promise((resolve, reject) => {
        this.currentCognitoUser.getSession((error, session) => {
          if (error) {
            reject(error);
          } else {
            resolve(session);
          }
        });
      });

      const attributes = await new Promise((resolve, reject) => {
        this.currentCognitoUser.getUserAttributes((error, attributes) => {
          if (error) {
            reject(error);
          } else {
            resolve(attributes);
          }
        });
      });

      const attributesObject = this.getUserAttributesFromCognitoAttributesArray(attributes);
      
      const accessToken = session.accessToken.jwtToken;
      const idToken = session.idToken.jwtToken;
      
      this.setCurrentCognitoUserAccessToken(accessToken);
      this.setCurrentCognitoUserIdToken(idToken)

      await this.setCredentialsFromCognitoIdentityPool();
      
      return { accessToken, userData: attributesObject };
    } catch (error) {
      throw error;
    }
  },
  
  resendConfirmationCode: async function () {
    return new Promise((resolve, reject) => {
      this.currentCognitoUser.resendConfirmationCode(function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    })
  },

  confirmUserSignUp: async function (confirmationCode) {
    return new Promise((resolve, reject) => {
      this.currentCognitoUser.confirmRegistration(confirmationCode, true, function (error, result) {
        if (error) {
          reject(error)
        }
        resolve(result)
      })
    })
  },

  userSignUp: async function (email, password, attributes) {

    return new Promise((resolve, reject) => {
      CognitoUserPool.signUp(email, password, attributes, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          this.setCurrentCognitoUserByEmail(email)
          resolve(result);
        }
      });
    });
  },

  userSignIn: async function (email, password) {

    this.setCurrentCognitoUserByEmail(email)
    const authData = {
      Username: email,
      Password: password
    }
    const authenticationDetails = new AuthenticationDetails(authData);

    return new Promise((resolve, reject) => {
      this.currentCognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: async (result) => {
          resolve({ authStatus: EAuthStatus.isLogged })
        },

        onFailure: (error) => {
          console.log('error authenticating', error);
          reject({ authStatus: this.getCognitoAuthStatus(error.code), message: error.message })
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {

          delete userAttributes.email_verified;
          resolve({ authStatus: EAuthStatus.mustChangePassword, userData: userAttributes })
        }
      });
    })
  },

  userSignOut: function () {
    this.currentCognitoUser.signOut();
  }
}