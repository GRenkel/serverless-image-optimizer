import { translator } from '../src/locales/translator';
import {
  api,
  configureApiAxiosInstance,
  apiErrorHandler,
} from '../src/services/apis/config/api';

jest.mock('uuid', () => {
  const uuidOriginal = jest.requireActual('uuid');
  const sessionId = 'test-session-id';
  return {
    ...uuidOriginal,
    v4: jest.fn().mockReturnValue(sessionId)
  }
})

jest.mock('../src/services/apis/config/api', () => {
  const apiOriginal = jest.requireActual('../src/services/apis/config/api');
  return {
    ...apiOriginal,
    api: {
      ...apiOriginal.api,
      axiosInstance: jest.fn().mockResolvedValue({data: "OK"})
    }
  }
})

describe('API Test Suit', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Axios Instance Configuration', () => {
    test('Should use already existing session identifier', () => {
      const sessionId = 'already-in-use';
      localStorage.setItem('session-id', sessionId)
      const axiosInstance = configureApiAxiosInstance();
      expect(axiosInstance.defaults.headers.session_id).toBe(sessionId);
    });

    test('Should create a new session identifier', () => {
      const sessionId = 'test-session-id';
      const axiosInstance = configureApiAxiosInstance();
      expect(axiosInstance.defaults.headers.session_id).toBe(sessionId);
    });

    test('Should configure a response interceptor for error handling', () => {
      const axiosInstance = configureApiAxiosInstance();
      expect(axiosInstance.interceptors.response.handlers.length).toBe(1)
      expect(axiosInstance.interceptors.response.handlers[0].rejected.name).toBe('apiErrorHandler')
    });
  })

  describe('Axios Error Handler', () => {
    test('Should reject a promise with the appropriate error', async () => {
      const errorResponse = {
        response: {
          data: {
            uiMessage: 'API error',
            error: 'API_ERROR',
          },
        },
      };
      await expect(() => apiErrorHandler(errorResponse)).rejects.toThrow(
        errorResponse.response.data.uiMessage
      );
    });

    test('Should reject a promise with a generic error when the uiMessage is missing', async () => {
      const error = new Error('Just an error')
      await expect(() => apiErrorHandler(error)).rejects.toThrow(translator.translate('api.error'));
    });
  })

  describe('Api Helper', () => {
    test('Should call api with the correct parameters when uploading a file', async () => {
      const apiConfigs = {
        endpoint: 'test-path',
        method: "POST",
        data: 'anything',
        options: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      }

      const expectedAPIOptions = {
        method: apiConfigs.method,
        headers: {
          ...apiConfigs.options.headers
        },
        params: {},
        data: apiConfigs.data
      };
      await api.callApi(apiConfigs)
      expect(api.axiosInstance).toBeCalledWith(apiConfigs.endpoint, expectedAPIOptions)
    })

    test('Should call api with the correct parameters when fetching users', async () => {
      const apiConfigs = {
        endpoint: 'test-path',
        method: "GET",
        options: {
          params: {
            q: 'search string'
          }
        }
      }

      const expectedAPIOptions = {
        method: apiConfigs.method,
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          q: 'search string'
        },
      };
      
      await api.callApi(apiConfigs)
      expect(api.axiosInstance).toBeCalledWith(apiConfigs.endpoint, expectedAPIOptions)
    })

    test('Should throw an error when an exception occurs on axios instance', async () => {
      const apiConfigs = {
        endpoint: 'test-path',
        method: "GET",
        options: {
          params: {
            q: 'search string'
          }
        }
      }

      const expectedAPIOptions = {
        method: apiConfigs.method,
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          q: 'search string'
        },
      };
      api.axiosInstance.mockRejectedValue(new Error('Async error message'));
      
      await expect(() => api.callApi(apiConfigs)).rejects.toThrow('Async error message');
      expect(api.axiosInstance).toBeCalledWith(apiConfigs.endpoint, expectedAPIOptions)
    })
  })

});
