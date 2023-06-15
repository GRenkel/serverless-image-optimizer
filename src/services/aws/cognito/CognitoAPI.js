import CognitoUserPool from "./CognitoUserPool";

export const CognitoAPI = {
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