import { CreateBucketCommand, HeadBucketCommand, ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { getSessionConfig } from "../../../utils/session";

const DEFAULT_REGION = "us-east-1"
export const DEFAULT_BUCKET_NAME = "app-5g-uploader"

function getBucketName() {
  const { sessionIdentifier } = getSessionConfig()
  return DEFAULT_BUCKET_NAME + '-' + sessionIdentifier
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

function listBucketObjectsCommand(listParams){
  return new ListObjectsCommand(listParams)
}

function bucketExistCommand(bucketParams) {
  return new HeadBucketCommand(bucketParams)
}

function configureS3Client(configs) {
  if (!configs.region) {
    configs.region = DEFAULT_REGION
  }
  const s3Client = new S3Client(configs);
  return s3Client
}

async function sendS3Command(client, command) {
  try {
    return await client.send(command)
  } catch (error) {
    console.log('S3 API ERROR: ', error)
    throw error
  }
}

export const awsS3Helper = {
  getBucketConfig,
  bucketExistCommand,
  createNewBucketCommand,
  listBucketObjectsCommand,
  configureS3Client,
  initiateS3Client: ({ region, credentials }) => configureS3Client({ region, credentials }),
  sendS3Command
}