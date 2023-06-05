import { S3Client } from "@aws-sdk/client-s3";
import { getSessionConfig } from "../../../utils/session";

const DEFAULT_REGION = "us-east-1"
export const DEFAULT_BUCKET_NAME = "app-5g-uploader"

function getBucketName() {
  const { sessionIdentifier } = getSessionConfig()
  return DEFAULT_BUCKET_NAME + sessionIdentifier
}

function getBucketConfig() {
  const bucketName = getBucketName()
  return {
    Bucket: bucketName
  }
}

function createNewBucketCommand(bucketConfig) {
  return new CreateBucketCommand(bucketConfig);
}

function configureS3Client(region, credentials) {
  const s3Client = new S3Client({ region: region || DEFAULT_REGION, credentials });
  return s3Client
}

async function sendS3Command(client, command){
  try {
    await client.send(command)
  } catch (error) {
    console.log('S3 API ERROR: ', error)
    throw error
  }
}

export const awsS3Configs = {
  getBucketConfig,
  createNewBucketCommand,
  configureS3Client,
  initiateS3Client: ({region, crendentials}) => this.configureS3Client({region, crendentials}),
  sendS3Command
}