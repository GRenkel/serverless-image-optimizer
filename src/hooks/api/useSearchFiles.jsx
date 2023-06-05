import { useState } from "react";
import useLoading from "../useLoading";
import { userAPI } from "../../services/apis/userAPI";
import { useS3 } from "./useS3";

export function useSearchFiles() {
  const { listBucketFiles } = useS3()
  const [error, setError] = useState(null);
  const [listedFiles, setListedFiles] = useState([]);
  const { isLoading, showLoading, hideLoading } = useLoading();

  const searchFiles = async (value) => {
    showLoading()
    try {
      const response = await listBucketFiles(value);
      setListedFiles(response);
    } catch (error) {
      setError(error.message)
    } finally {
      hideLoading()
    }
  };

  const updateFilesList = (users) => {
    setListedFiles(users)
  }

  return { error, isLoading, listedFiles, updateFilesList, searchFiles }
}