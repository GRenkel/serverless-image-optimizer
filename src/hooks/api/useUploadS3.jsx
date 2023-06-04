import { useState } from "react";
import { translate } from "../../locales/translator";
import { exceedsMaxFileSize } from '../../utils/fileUpload'
import useLoading from "../useLoading";
import { FileAPI } from "../../services/apis/fileAPI";

export function useUploadS3() {
  const [error, setError] = useState(null);
  const [s3UploadResponse, setS3UploadResponse] = useState([]);
  const { isLoading, showLoading, hideLoading } = useLoading();

  function validateFile(file) {
    if (exceedsMaxFileSize(file)) {
      return ({ isValid: false, reason: translate('upload.file-too-large') })
    }
    return { isValid: true }
  }

  async function uploadFileToS3({ file, onSuccess, onError }) {
    showLoading()
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await FileAPI.uploadToS3(formData);
      onSuccess()
      setS3UploadResponse(response)
    } catch (error) {
      onError(error)
      setError(error.message)
    } finally {
      hideLoading()
    }
  }

  return { error, isLoading, s3UploadResponse, uploadFileToS3, validateFile }
};
