import { StaticCredentialsProvider } from '@aws-sdk/credential-providers';

export const getAWSCredentials = () => {
  // WARNING!!!
  // don't do it! fetch temporary credentials from your API or use cognito instead!
  return new StaticCredentialsProvider({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  })
}