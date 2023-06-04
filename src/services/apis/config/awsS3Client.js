import { S3Client } from "@aws-sdk/client-s3";
import { getSessionConfig } from "../../../utils/session";

const REGION = "us-east-1"

function getBucketConfig() {

  let { sessionIdentifier } = getSessionConfig()

  return {
    key: sessionIdentifier
  }
}

function configureS3Client() {
  
  const s3Client = new S3Client({ region: REGION });
  
  return s3Client
}

const awsS3Client = {}

export {
  configureS3Client,
  getBucketConfig,
  awsS3Client,
}