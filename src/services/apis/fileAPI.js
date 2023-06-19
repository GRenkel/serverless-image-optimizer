import { api } from "./config/api"

const paths = {
  fileUpload: 'api/files',
};

export const FileAPI = {
  uploadToS3: async (file) => {
    return ""
  },
  uploadCSV: async (file) => {
    return api.callApi({
      endpoint: paths.fileUpload,
      method: "POST",
      data: file,
      options: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    });
  }
}