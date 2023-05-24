import axios from 'axios';
import {
  configureApiAxiosInstance,
  uploadCSV,
  searchUsers,
  handleApiError,
} from '../src/services/api';

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
  });

  
  test('handleApiError should throw the appropriate error', () => {
    const errorResponse = {
      response: {
        data: {
          uiMessage: 'API error',
          error: 'API_ERROR',
        },
      },
    };

    expect(() => handleApiError(errorResponse)).toThrowError(errorResponse.response.data.uiMessage);

  });
});
