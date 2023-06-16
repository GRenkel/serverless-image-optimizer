import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, } from "amazon-cognito-identity-js";
import CognitoUserPool from "./CognitoUserPool";
import EAuthStatus from './EAuthStatus.json'

export const CognitoAPIHelper = {
  cognitoUser: null,

  setCognitoUser: (UserIdentification) => {
   
    const userData = {
      Username: UserIdentification,
      Pool: CognitoUserPool,
    }

    this.cognitoUser = new CognitoUser(userData);
  },

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

  getCurrentUserSession: async function () {
    const currentUser = CognitoUserPool.getCurrentUser()

    if (currentUser === null) {
      return {}
    }

    return new Promise((resolve, reject) => currentUser.getSession((error, session) => {
      if (error) {
        reject(error)
      }
      currentUser.getUserAttributes((error, attributes) => {
        if (error) {
          reject(error)
        } else {
          const attributesObject = this.getUserAttributesFromCognitoAttributesArray(attributes)
          resolve({ jwtToken: session.accessToken.jwtToken, userData: attributesObject })
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

    return new Promise((resolve, reject) => {
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: async (result) => {
          const jwtToken = result.accessToken.jwtToken
          console.log('success authenticating', result);
          resolve({ authStatus: EAuthStatus.isLogged })
        },
        onFailure: (error) => {
          console.log('error authenticating', error);
          reject({ authStatus: this.getAuthStatus(error.code), error })
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {

          delete userAttributes.email_verified;
          resolve({ authStatus: EAuthStatus.mustChangePassword, userData: userAttributes })
        }
      });
    })
  }
}