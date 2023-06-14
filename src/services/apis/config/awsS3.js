import { AbortMultipartUploadCommand, CompleteMultipartUploadCommand, CreateBucketCommand, CreateMultipartUploadCommand, DeleteObjectCommand, GetObjectCommand, HeadBucketCommand, ListObjectsCommand, PutObjectCommand, S3Client, UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const DEFAULT_REGION = "us-east-1"
export const MAX_CHUNCK_SIZE = 5 * 1024 * 1024
export const DEFAULT_BUCKET_NAME = "app-5g-uploader-fa55e7de-5e9e-496a-9023-aed5e698797c"

function getBucketName() {
  return DEFAULT_BUCKET_NAME
}

function getBucketConfig() {
  const bucketName = getBucketName()
  return {
    Bucket: bucketName
  }
}

function getCreateNewBucketCommand(bucketConfig) {
  return new CreateBucketCommand(bucketConfig);
}

function getListBucketObjectsCommand(listParams) {
  return new ListObjectsCommand(listParams)
}

function getBucketExistCommand(bucketParams) {
  return new HeadBucketCommand(bucketParams)
}

function getAbortMultipartUploadCommand(abortParams) {
  return new AbortMultipartUploadCommand(abortParams)
}

function getCreateMultipartUploadCommand(uploadParams) {
  return new CreateMultipartUploadCommand(uploadParams)
}

function getUploadPartCommand(uploadParams) {
  return new UploadPartCommand(uploadParams)
}

function getCompleteMultipartUploadCommand(completedUploadParams) {
  return new CompleteMultipartUploadCommand(completedUploadParams)
}

function getPutObjectCommand(uploadParams) {
  return new PutObjectCommand(uploadParams)
}

function getDeleteObjectCommand(deleteParams) {
  return new DeleteObjectCommand(deleteParams)
}

function createPresignedGetUrl(client, getParams) {
  const command = new GetObjectCommand(getParams)
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

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
  getBucketExistCommand,
  getCreateNewBucketCommand,
  getListBucketObjectsCommand,
  getUploadPartCommand,
  getAbortMultipartUploadCommand,
  getPutObjectCommand,
  createPresignedGetUrl,
  getCreateMultipartUploadCommand,
  getCompleteMultipartUploadCommand,
  getDeleteObjectCommand,
  configureS3Client,
  initiateS3Client: ({ region, credentials }) => configureS3Client({ region, credentials }),
  sendS3Command
}