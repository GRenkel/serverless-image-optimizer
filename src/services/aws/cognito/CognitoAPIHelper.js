import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import CognitoUserPool from "./CognitoUserPool";

export const CognitoAPIHelper = {
  
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
  }
}