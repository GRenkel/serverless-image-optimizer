import { useS3 } from "./useS3";
import useLoading from "../useLoading";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth/AuthContext";
import { awsWebSocket } from "../../services/aws/apiGateway/webSocket";
import { awsConstants } from "../../services/aws/constants/awsConstants";
import {replacesKeyParamsWithOptimizedObjectParams } from "../../utils/fileUpload";
const { UPLOAD_OBJECT_PREFIX } = awsConstants

export function useFileManager() {
  const { userSession: { user: { sub: userIdentifier } } } = useContext(AuthContext)

  const [error, setError] = useState(null);
  const [listedFiles, setListedFiles] = useState([]);

  const {
    error: s3Error,
    listBucketObjects,
    getDownloadObjectURLFromBucket,
    removeObjectFromBucket, uploadObjectToBucket } = useS3({ defaultPrefix: `${UPLOAD_OBJECT_PREFIX}/${userIdentifier}/` })

  const { isLoading, showLoading, hideLoading } = useLoading();

  useEffect(() => {
    awsWebSocket.establishSocketConnection({ userIdentifier })
    awsWebSocket.addEventListener(handleSocketImageOptimizedNotification, userIdentifier)
    // return awsWebSocket.webSocket.close()
  }, [])

  useEffect(() => {
    setError(s3Error)
  }, [s3Error])

  async function searchFiles(fileName) {
    showLoading()
    try {
      const bucketFiles = await listBucketObjects(fileName);
      const updatedBucketFiles = await Promise.all(
        bucketFiles.map(async (file) => {
          const optimizedKey = replacesKeyParamsWithOptimizedObjectParams(file.objectKey)
          const presignedURL = await getDownloadObjectURLFromBucket(optimizedKey);
          return {
            ...file,
            publicObjectURL: presignedURL
          };
        })
      );
      setListedFiles(updatedBucketFiles);
    } catch (error) {
      setError(error.message)
    } finally {
      hideLoading()
    }
  };

  function processSocketImageOptimizedNotification({ optimizedObjectKey, originalObjectKey, presignedURL }) {
    setListedFiles(current => {
      console.log(current)
      return current.map(file => {
        if (file.key === originalObjectKey) {
          return { ...file, isProcessing: false, optimizedObjectKey, publicObjectURL: presignedURL }
        }
        return file
      })
    }
    )

  }
  function handleSocketImageOptimizedNotification(notification) {
    console.log('Websocket Notification: ', notification)
    processSocketImageOptimizedNotification(notification)
  }

  function updateAndRemoveTemporaryUploadingFromFileList(newFile) {
    if (Object.keys(newFile).length > 0) {
      return setListedFiles((current) => ([{ ...newFile, isProcessing: true }, ...current.filter(f => !f.isUploading)]))
    }
    return setListedFiles((current) => ([...current.filter(f => !f.isUploading)]))
  }

  async function uploadFile({ file, onSuccess, onError }) {
    let resultFileUploaded = {}
    try {
      const uploadingFile = { ...file, id: 'uploading', isUploading: true }
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

  async function removeFile({ id, objectKey }) {
    try {
      await removeObjectFromBucket(objectKey);
      setListedFiles((current) => (current.filter(obj => id !== obj.id)))
    } catch (error) {
      setError(error.message)
    }
  }

  async function downloadFile({ objectKey, url }) {
    try {
      const URL = url ? url : await getDownloadObjectURLFromBucket(objectKey);
      debugger
      window.open(
        URL,
        '_blank'
      );
    } catch (error) {
      setError(error.message)
    }
  }

  return { error, isLoading, listedFiles, downloadFile, removeFile, uploadFile, searchFiles }
}