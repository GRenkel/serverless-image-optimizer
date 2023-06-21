import { useContext, useEffect, useState } from "react";
import useLoading from "../useLoading";
import { useS3 } from "./useS3";
import AuthContext from "../../contexts/auth/AuthContext";
import { awsWebSocket } from "../../services/aws/apiGateway/webSocket";

export function useFileManager() {
  const [error, setError] = useState(null);
  const { userSession: { user: { sub: userIdentifier } } } = useContext(AuthContext)
  const [listedFiles, setListedFiles] = useState([]);
  const {
    error: s3Error,
    listBucketObjects,
    getDownloadObjectURLFromBucket,
    removeObjectFromBucket, uploadObjectToBucket } = useS3({ defaultPrefix: `uploads/${userIdentifier}/` })
  const { isLoading, showLoading, hideLoading } = useLoading();

  useEffect(() => {
    awsWebSocket.establishSocketConnection({ userIdentifier })
    awsWebSocket.addEventListener(processSocketImageOtimizedNotification, userIdentifier)
    // return awsWebSocket.webSocket.close()
  }, [])

  useEffect(() => {
    setError(s3Error)
  }, [s3Error])

  async function searchFiles(fileName) {
    showLoading()
    try {
      const response = await listBucketObjects(fileName);
      setListedFiles(response);
    } catch (error) {
      setError(error.message)
    } finally {
      hideLoading()
    }
  };

  function processSocketImageOtimizedNotification(notification) {
    console.log('Notification: ', notification)
  }

  function updateAndRemoveTemporaryUploadingFromFileList(newFile) {
    if (Object.keys(newFile).length > 0) {
      return setListedFiles((current) => ([newFile, ...current.filter(f => !f.isUploading)]))
    }
    return setListedFiles((current) => ([...current.filter(f => !f.isUploading)]))
  }

  async function uploadFile({ file, onSuccess, onError }) {
    let resultFileUploaded = {}
    try {
      const uploadingFile = { ...file, id: 'uploading', isUploading: true, isProcessing: true }
      setListedFiles((current) => ([uploadingFile, ...current]))
      const response = await uploadObjectToBucket({ file });
      resultFileUploaded = response
      onSuccess()
    } catch (error) {
      onError(error)
    } finally {
      setTimeout(() => updateAndRemoveTemporaryUploadingFromFileList(resultFileUploaded), 500)
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

  async function downloadFile(fileName) {
    try {
      const URL = await getDownloadObjectURLFromBucket(fileName);
      window.location.href = URL;
    } catch (error) {
      setError(error.message)
    }
  }

  return { error, isLoading, listedFiles, downloadFile, removeFile, uploadFile, searchFiles }
}