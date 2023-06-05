import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./config/awsS3Client";



export const s3API = {
  createNewBucket: () => new CreateBucketCommand(bucketConfig)
}