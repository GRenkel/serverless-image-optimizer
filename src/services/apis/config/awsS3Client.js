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

function configureS3Client() {

  const s3Client = new S3Client({ region: DEFAULT_REGION });

  return s3Client
}

const awsS3Client = {}

export {
  configureS3Client,
  getBucketConfig,
  awsS3Client,
}