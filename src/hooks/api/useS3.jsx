import { useState } from "react";
import useLoading from "../useLoading";
import { s3API } from "../../services/apis/s3API";
import { formatFileSize } from "../../utils/fileUpload";

const MAX_COMMON_FILE_SIZE = 25 * 1024 * 1024

export function useS3() {
  const [error, setError] = useState(null);
  const [uploadResponse, setUploadResponse] = useState([]);
  const { isLoading, showLoading, hideLoading } = useLoading();

  async function listBucketObjects(objName) {
    try {
      const objects = await s3API.listBucketObjects(objName)
      return objects.map(({ ETag, Size, Key }) => ({ id: ETag, name: Key, ...formatFileSize(Size) }))
    } catch (error) {
      console.log(error)
    }
  }

  async function uploadObjectToBucket({ file }) {
    showLoading()
    try {
      const uploadFunction = (file.size > MAX_COMMON_FILE_SIZE ? s3API.uploadLargeObjectToBucket : s3API.uploadCommonObjectToBucket).bind(s3API)
      const response = await uploadFunction(file);
      setUploadResponse(response)
      return { id: response.ETag, name: file.name, ...formatFileSize(file.size)}
    } catch (error) {
      setError(error.message)
    } finally {
      hideLoading()
    }
  }

  async function removeObjectFromBucket(objectKey){
    try {
      return await s3API.deleteObjectFromBucket(objectKey);
    } catch (error) {
      setError(error.message)
    } 
  }

  return { error, isLoading, listBucketObjects, uploadResponse, removeObjectFromBucket, uploadObjectToBucket }
};
