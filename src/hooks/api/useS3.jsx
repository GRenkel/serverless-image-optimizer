import { useState } from "react";
import useLoading from "../useLoading";
import { s3API } from "../../services/apis/s3API";
import { formatFileSize } from "../../utils/fileUpload";

const MAX_COMMON_FILE_SIZE = 25 * 1024 * 1024

export function useS3() {
  const [error, setError] = useState(null);
  const [uploadResponse, setUploadResponse] = useState([]);
  const { isLoading, showLoading, hideLoading } = useLoading();

  async function listBucketFiles(key) {
    try {
      const objects = await s3API.listBucketObjects()
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
    showLoading()
    try {
      const response = await s3API.deleteObjectFromBucket(objectKey);
    } catch (error) {
      setError(error.message)
    } finally {
      hideLoading()
    }
  }

  return { error, isLoading, listBucketFiles, uploadResponse, removeObjectFromBucket, uploadObjectToBucket }
};
