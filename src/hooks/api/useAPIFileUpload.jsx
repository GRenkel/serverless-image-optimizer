import { useState } from "react";
import { translate } from "../../locales/translator";
import { exceedsMaxFileSize } from '../../utils/fileUpload'
import api from "../../services/api";
import useLoading from "../useLoading";

export function useAPIFileUpload() {
  const [error, setError] = useState(null);
  const [uploadResponse, setUploadResponse] = useState([]);
  const { isLoading, showLoading, hideLoading } = useLoading();

  function validateFile(file) {
    if (exceedsMaxFileSize(file)) {
      return ({ isValid: false, reason: translate('upload.file-too-large') })
    }

    return { isValid: true }
  }

  async function uploadFileToAPI({ file, onSuccess, onError }) {
    showLoading()
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.uploadCSV(formData);
      onSuccess()
      setUploadResponse(response)
    } catch (error) {
      onError(error)
      setError(error)
    } finally {
      hideLoading()
    }
  }
  return { error, isLoading, uploadResponse, uploadFileToAPI, validateFile }
};
