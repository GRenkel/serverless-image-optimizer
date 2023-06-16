import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, } from "amazon-cognito-identity-js";
import CognitoUserPool from "./CognitoUserPool";
import EAuthStatus from './EAuthStatus.json'

export const CognitoAPIHelper = {

  getAuthStatus: function (code) {
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
    debugger
    let cognitoAttributes = {}
    attributesArray.forEach(attribute => cognitoAttributes[attribute.Name] = attribute.Value)
    return cognitoAttributes
  },

  userSignUp: async function (email, password, attributes) {
    return new Promise((resolve, reject) => {
      CognitoUserPool.signUp(email, password, attributes, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getCurrentUserAttributes: async function () {
    const currentUser = CognitoUserPool.getCurrentUser()
    return new Promise((resolve, reject) => currentUser.getSession((error, session) => {
      if (error) {
        reject(error)
      }
      currentUser.getUserAttributes((error, attributes) => {
        if (error) {
          reject(error)
        } else {
          const attributesObject = this.getUserAttributesFromCognitoAttributesArray(attributes)
          resolve(attributesObject)
        }
      })
    }))
  },

  userLogin: async function (email, password) {
    const authData = {
      Username: email,
      Password: password
    }
    const authenticationDetails = new AuthenticationDetails(authData);

    const userData = {
      Username: email,
      Pool: CognitoUserPool,
    }

    let cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: async (result) => {
          const jwtToken = result.accessToken.jwtToken
          console.log('success authenticating', result);
          resolve({ authStatus: EAuthStatus.isLogged, jwtToken })
        },
        onFailure: (error) => {
          console.log('error authenticating', error);
          reject({ authStatus: this.getAuthStatus(error.code), error })
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          delete userAttributes.email_verified;
          resolve({ authStatus: EAuthStatus.mustChangePassword, userData: userAttributes })

          // store userAttributes on global variable
          // sessionUserAttributes = userAttributes;
        }
      });
    })
  }
}