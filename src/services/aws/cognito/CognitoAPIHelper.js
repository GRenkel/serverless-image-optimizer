import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, } from "amazon-cognito-identity-js";
import CognitoUserPool from "./CognitoUserPool";
import EAuthStatus from './EAuthStatus.json'

export const CognitoAPIHelper = {
  cognitoUser: null,

  setCognitoUser: function (UserIdentification) {

    const userData = {
      Username: UserIdentification,
      Pool: CognitoUserPool,
    }

    return this.cognitoUser = new CognitoUser(userData);
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

  getCurrentUserSession: async function () {
    const currentUser = CognitoUserPool.getCurrentUser()

    if (currentUser === null) {
      throw new Error('User is not authenticated!')
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
          this.setCognitoUser(attributesObject.email)
          resolve({ jwtToken: session.accessToken.jwtToken, userData: attributesObject })
        }
      })
    }))
  },

  resendConfirmationCode: async function () {
    return new Promise((resolve, reject) => {
      this.cognitoUser.resendConfirmationCode(function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        debugger
        resolve(result);
      });
    })
  },

  confirmUserSignUp: async function (confirmationCode) {
    return new Promise((resolve, reject) => {
      this.cognitoUser.confirmRegistration(confirmationCode, true, function (error, result) {
        if (error) {
          reject(error)
        }
        resolve(result)
      })
    })
  },

  userSignUp: async function (email, password, attributes) {

    this.setCognitoUser(email)

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

  userSignIn: async function (email, password) {

    this.setCognitoUser(email)

    const authData = {
      Username: email,
      Password: password
    }
    const authenticationDetails = new AuthenticationDetails(authData);

    return new Promise((resolve, reject) => {
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: async (result) => {
          console.log('success authenticating', result);
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
    debugger
    this.cognitoUser.signOut();
  }
}