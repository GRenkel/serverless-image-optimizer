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

  async function uploadFile({ file, onSuccess, onError }) {
    showLoading()
    try {
      debugger
      const response = await uploadObjectToBucket({file});
      onSuccess()
      setListedFiles((current) => ([response, ...current ]))
    } catch (error) {
      onError(error)
      setError(error.message)
    } finally {
      hideLoading()
    }
  }

  async function removeFile({ id, name }) {
    showLoading()
    try {
      await removeObjectFromBucket(name);
      setListedFiles((current) => (current.filter(obj => id !== obj.id)))
    } catch (error) {
      setError(error.message)
    } finally {
      hideLoading()
    }
  }


  return { error, isLoading, listedFiles, removeFile, uploadFile, searchFiles }
}