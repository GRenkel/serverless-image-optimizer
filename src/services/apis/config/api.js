import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { translate } from '../../../locales/translator';

const BASE_URL = 'http://localhost:5050/'
const AXIOS_TIMEOUT = 20000

export function errorHandler(error) {
  let customError = new Error(translate('api.error'))

  if (error.response && error.response?.data?.uiMessage) {
    const { data: { uiMessage } } = error.response;
    customError = new Error(uiMessage)
  }

  return Promise.reject(customError)
}

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

  axiosInstance.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
  })

  return axiosInstance;
}

export const api = {
  axiosInstance: configureApiAxiosInstance(),

  async callApi({ endpoint, method = 'GET', data = null, options: { headers = {}, params = {} } }) {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        params,
      };

      if (data) {
        options.data = data;
      }

      const response = await this.axiosInstance(`${endpoint}`, options);
      return response.data;
    } catch (error) {
      console.log('API ERROR: ', error)
      throw error
    }
  }
};
