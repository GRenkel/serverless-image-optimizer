import { translate } from '../src/locales/translator';
import {
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

describe('API Suit Test', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Axios Instance Configuration', ()=>{
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
  describe('Axios Error Handler', ()=> {
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
      await expect(() => apiErrorHandler(error)).rejects.toThrow(translate('api.error'));
    });
  })
});
