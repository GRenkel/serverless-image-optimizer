import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'http://localhost:5050/'
const AXIOS_TIMEOUT = 15000
const paths = {
  files: 'api/files',
  users: 'api/users'
};

export function configureApiAxiosInstance() {
  let sessionIdentifier = localStorage.getItem('session-id');
  if (!sessionIdentifier) {
    const sessionId = uuidv4();
    localStorage.setItem('session-id', sessionId);
    sessionIdentifier = sessionId;
  }
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: AXIOS_TIMEOUT,
    headers: {
      'session_id': sessionIdentifier
    }
  });
  return axiosInstance;
}

const axiosInstance = configureApiAxiosInstance();

export function handleApiError(err) {
  const { data: { uiMessage, error } } = err.response;
  console.error('API - ERROR:', error);
  throw new Error(uiMessage)
}

export async function uploadCSV(formData) {
  try {
    const response = await axiosInstance.post(`${paths.files}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (err) {
   handleApiError(err)
  }
};

export async function searchUsers(query) {
  try {
    const response = await axiosInstance.get(`${paths.users}`, { params: { q: query } });
    return response.data;
  } catch (err) {
   handleApiError(err)
  }
}