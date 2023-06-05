import { useEffect, useState } from "react";
import { translate } from "../../locales/translator";
import { exceedsMaxFileSize } from '../../utils/fileUpload'
import useLoading from "../useLoading";
import { FileAPI } from "../../services/apis/fileAPI";
import { s3API } from "../../services/apis/s3API";

export function useS3() {
  const [error, setError] = useState(null);
  const [s3UploadResponse, setS3UploadResponse] = useState([]);
  const { isLoading, showLoading, hideLoading } = useLoading();

  useEffect(() => {
    listBucketFiles()
  }, [])


  async function listBucketFiles(key) {
    try {
      const objects = await s3API.listBucketObjects()
      return objects.map(({ETag, Size, Key}) => ({ id: ETag, name: Key, size: Size/1024, sizeUnit: 'KB'}))
    } catch (error) {
      console.log(error)
    }
  }

  async function uploadFileToS3({ file, onSuccess, onError }) {
    // showLoading()
    // try {
    //   const formData = new FormData();
    //   formData.append('file', file);
    //   const response = await FileAPI.uploadToS3(formData);
    //   onSuccess()
    //   setS3UploadResponse(response)
    // } catch (error) {
    //   onError(error)
    //   setError(error.message)
    // } finally {
    //   hideLoading()
    // }
  }

  return { error, isLoading, listBucketFiles, s3UploadResponse, uploadFileToS3, validateFile }
};
