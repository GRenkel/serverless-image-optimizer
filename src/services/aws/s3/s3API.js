import { removesWhiteSpaces } from "../../../utils/fileUpload";
import { awsS3Helper, MAX_CHUNCK_SIZE } from "./awsS3";

export const s3API = {
  s3Client: undefined,
  objectDefaultPrefix: undefined,
  bucketConfig: awsS3Helper.getBucketConfig(),

  initiateS3Client: function (credentials, options) {
    this.objectDefaultPrefix = options.defaultPrefix
    this.s3Client = awsS3Helper.initiateS3Client(credentials)
  },

  addDefaultPrefixAndRemoveEmptySpaces: function (key) {
    return this.objectDefaultPrefix + removesWhiteSpaces(key)
  },
  removeDefaultPrefix: function(key){
    const [prefixUpload, prefixUserSub, ...rest] = key.split('/')
    return rest.join('/')
  },
  async createNewBucket() {
    const pushBucketCommand = awsS3Helper.getCreateNewBucketCommand(this.bucketConfig)
    return awsS3Helper.sendS3Command(this.s3Client, pushBucketCommand)
  },

  async listBucketObjects(Prefix) {
    const DEFAULT_MAX_KEYS = 50
    const listCommandParams = { MaxKeys: DEFAULT_MAX_KEYS, ...this.bucketConfig }

    listCommandParams.Prefix = this.objectDefaultPrefix
    if (Prefix) {
      listCommandParams.Prefix += Prefix
    }

    const listBucketObjectsCommand = awsS3Helper.getListBucketObjectsCommand(listCommandParams)
    try {
      const { Contents } = await awsS3Helper.sendS3Command(this.s3Client, listBucketObjectsCommand)
      if (Contents) {
        return Contents.map((object) => {
          const keyWithoutDefaultPrefix = this.removeDefaultPrefix(object.Key)
          return { ...object, key: object.Key, shortObjectKey: keyWithoutDefaultPrefix}
        })
      }
      return []
    } catch (error) {
      throw error
    }
  },

  async getDownloadObjectURLFromBucket(objectKey) {
    try {
      const downloadParams = { Key: objectKey, ...this.bucketConfig }
      return awsS3Helper.createPresignedGetUrl(this.s3Client, downloadParams)
    } catch (error) {
      throw error
    }
  },

  async deleteObjectFromBucket(objectKey) {
    try {
      console.log(objectKey)
      const deleteParams = { Key: objectKey, ...this.bucketConfig }
      const deleteCommand = awsS3Helper.getDeleteObjectCommand(deleteParams)
      return await awsS3Helper.sendS3Command(this.s3Client, deleteCommand)
    } catch (error) {
      throw error
    }
  },

  async uploadCommonObjectToBucket(s3object) {
    try {
      const uploadParams = { Key: this.addDefaultPrefixAndRemoveEmptySpaces(s3object.name), ...this.bucketConfig, Body: s3object }
      const uploadCommand = awsS3Helper.getPutObjectCommand(uploadParams)
      const response = await awsS3Helper.sendS3Command(this.s3Client, uploadCommand)
      response.key = uploadParams.Key
      return response
    } catch (error) {
      throw error
    }
  },

  async uploadLargeObjectToBucket(s3object) {

    const uploadParams = { Key: this.addDefaultPrefixAndRemoveEmptySpaces(s3object.name), ...this.bucketConfig }

    try {
      let uploadPromises = []
      const numberOfFragments = Math.ceil(s3object.size / MAX_CHUNCK_SIZE);

      const initiateMultipartUploadCommand = awsS3Helper.getCreateMultipartUploadCommand(uploadParams)
      const multipartUpload = await awsS3Helper.sendS3Command(this.s3Client, initiateMultipartUploadCommand)
      uploadParams.UploadId = multipartUpload.UploadId

      for (let idx = 0; idx < numberOfFragments; idx++) {
        const fragmentStart = idx * MAX_CHUNCK_SIZE;
        const fragmentEnd = fragmentStart + MAX_CHUNCK_SIZE;

        const fragmentUploadParams = {
          ...uploadParams,
          Body: s3object.slice(fragmentStart, fragmentEnd),
          PartNumber: idx + 1,
        }
        const partialUploadCommand = awsS3Helper.getUploadPartCommand(fragmentUploadParams);
        uploadPromises.push(awsS3Helper.sendS3Command(this.s3Client, partialUploadCommand))
      }

      const uploadResults = await Promise.all(uploadPromises);

      const completedUploadParams = {
        ...uploadParams,
        MultipartUpload: {
          Parts: uploadResults.map(({ ETag }, i) => ({
            ETag,
            PartNumber: i + 1,
          })),
        },
      }

      const completeMultipartUploadCommand = awsS3Helper.getCompleteMultipartUploadCommand(completedUploadParams)
      const response = await awsS3Helper.sendS3Command(this.s3Client, completeMultipartUploadCommand)
      response.key = uploadParams.Key
      return response

    } catch (error) {

      if (uploadParams.UploadId) {
        const abortCommand = awsS3Helper.getAbortMultipartUploadCommand(uploadParams)
        await awsS3Helper.sendS3Command(this.s3Client, abortCommand);
      }
      throw error
    }
  },

}