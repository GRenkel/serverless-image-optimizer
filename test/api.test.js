import {
  configureApiAxiosInstance,
  errorHandler,
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

  test('configureApiAxiosInstance should configure axios instance with session identifier', () => {
    const sessionId = 'test-session-id';
    const axiosInstance = configureApiAxiosInstance();
    expect(localStorage.getItem('session-id')).toBe(sessionId);
    expect(axiosInstance.defaults.headers.session_id).toBe(sessionId);
    expect(axiosInstance.interceptors.response.handlers.length).toBe(1)
  });

  
  test('errorHandler should reject a promise with the appropriate error', async () => {
    const errorResponse = {
      response: {
        data: {
          uiMessage: 'API error',
          error: 'API_ERROR',
        },
      },
    };

    await expect(() => errorHandler(errorResponse)).rejects.toThrow(
      errorResponse.response.data.uiMessage,
    );

  });
});
