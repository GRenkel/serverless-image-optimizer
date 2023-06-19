import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, } from "amazon-cognito-identity-js";
import CognitoUserPool from "./CognitoUserPool";
import EAuthStatus from './EAuthStatus.json'

export const CognitoAPIHelper = {
  currentCognitoUser: null,

  setCurrentCognitoUser: function (cognitoUser) {
    return this.currentCognitoUser = cognitoUser
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

  getCurrentUserSession: async function () {
    const currentUser = CognitoUserPool.getCurrentUser()
    this.setCurrentCognitoUser(currentUser)

    if (this.currentCognitoUser === null) {
      throw new Error('User is not authenticated!')
    }


    return new Promise((resolve, reject) => this.currentCognitoUser.getSession((error, session) => {
      if (error) {
        reject(error)
      }
      this.currentCognitoUser.getUserAttributes((error, attributes) => {
        if (error) {
          reject(error)
        } else {
          const attributesObject = this.getUserAttributesFromCognitoAttributesArray(attributes)
          resolve({ jwtToken: session.accessToken.jwtToken, userData: attributesObject })
        }
      })
    }))
  },

  resendConfirmationCode: async function () {
    return new Promise((resolve, reject) => {
      this.currentCognitoUser.resendConfirmationCode(function (error, result) {
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
    this.currentCognitoUser.signOut();
  }
}