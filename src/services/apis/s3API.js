import { getAWSCredentials } from "./config/awsCredentials";
import { awsS3Helper } from "./config/awsS3";

export const s3API = {
  bucketConfig: awsS3Helper.getBucketConfig(),
  s3Client: (() => {
    const credentials = getAWSCredentials()
    return awsS3Helper.initiateS3Client({ credentials })
  })(),

  async createNewBucket() {
    const pushBucketCommand = awsS3Helper.createNewBucketCommand(this.bucketConfig)
    return awsS3Helper.sendS3Command(this.s3Client, pushBucketCommand)
  },

  async bucketExists() {
    const { Bucket, rest } = this.bucketConfig
    const bucketExistsCommand = awsS3Helper.bucketExistCommand({ Bucket })
    try {
      const response = await awsS3Helper.sendS3Command(this.s3Client, bucketExistsCommand)
      debugger
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  },

  async listBucketObjects() {
    const DEFAULT_MAX_KEYS = 50
    const listBucketObjectsCommand = awsS3Helper.listBucketObjectsCommand({ MaxKeys: DEFAULT_MAX_KEYS, ...this.bucketConfig })
    try {
      const { Contents } = await awsS3Helper.sendS3Command(this.s3Client, listBucketObjectsCommand)
      return Contents
    } catch (error) {
      console.log(error)
    }
  },
  uploadFileToBucket: async () => {

  },

}