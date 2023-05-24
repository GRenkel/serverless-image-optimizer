import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const BASE_URL = 'http://localhost:5050/'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const paths = {
  files: 'api/files',
  users: 'api/users'
};

(
  () => {
    let sessionIdentifier = localStorage.getItem('session-id');
    if (!sessionIdentifier) {
      const sessionId = uuidv4();
      localStorage.setItem('session-id', sessionId);
      sessionIdentifier = sessionId
    }
    axiosInstance.interceptors.request.use(config => {
      config.headers = {
        ...config.headers,
        session_id: sessionIdentifier,
      };
      return config;
    }, error => {
      return Promise.reject(error);
    });
  }
)()

export async function uploadCSV(formData) {
  try {
    const response = await axiosInstance.post(`${paths.files}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('API request failed');
  }
};

export async function searchUsers(query) {
  try {
    const response = await axiosInstance.get(`${paths.users}`, { params: { q: query } });
    return response.data;
  } catch (error) {
    throw new Error('API request failed');
  }
}