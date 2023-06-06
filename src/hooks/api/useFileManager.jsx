import { useState } from "react";
import useLoading from "../useLoading";
import { useS3 } from "./useS3";

export function useFileManager() {
  const [error, setError] = useState(null);
  const [listedFiles, setListedFiles] = useState([]);
  const { listBucketObjects, removeObjectFromBucket, uploadObjectToBucket } = useS3()
  const { isLoading, showLoading, hideLoading } = useLoading();

  async function searchFiles(value) {
    showLoading()
    try {
      const response = await listBucketObjects(value);
      setListedFiles(response);
    } catch (error) {
      setError(error.message)
    } finally {
      hideLoading()
    }
  };

  function updateAndRemoveTemporaryUploadingFromFileList(newFile) {
    setListedFiles((current) => ([newFile, ...current.filter(f => !f.isUploading)]))
  }

  async function uploadFile({ file, onSuccess, onError }) {
    try {
      const uploadingFile = { ...file, id: 'uploading', isUploading: true }
      setListedFiles((current) => ([uploadingFile, ...current]))
      const response = await uploadObjectToBucket({ file });
      onSuccess()
      setTimeout(() => updateAndRemoveTemporaryUploadingFromFileList(response), 500)
    } catch (error) {
      onError(error)
      setError(error.message)
    }
  }

  async function removeFile({ id, name }) {
    try {
      await removeObjectFromBucket(name);
      setListedFiles((current) => (current.filter(obj => id !== obj.id)))
    } catch (error) {
      setError(error.message)
    }
  }


  return { error, isLoading, listedFiles, removeFile, uploadFile, searchFiles }
}