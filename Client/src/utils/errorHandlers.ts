import { ApiError } from '../types/error';
import { AUTH_ERRORS, API_ERRORS } from './errorMessages';

export function handleApiError(error: any): ApiError {
  if (error.response) {
    // Server responded with error
    return {
      message: error.response.data.message || API_ERRORS.SERVER_ERROR,
      errors: error.response.data.errors,
      statusCode: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: API_ERRORS.NETWORK_ERROR,
      statusCode: 0,
    };
  } else {
    // Something else went wrong
    return {
      message: error.message || API_ERRORS.SERVER_ERROR,
      statusCode: 500,
    };
  }
}

export function handleAuthError(error: any): ApiError {
  if (error.response?.status === 401) {
    return {
      message: AUTH_ERRORS.SESSION_EXPIRED,
      statusCode: 401,
    };
  }
  return handleApiError(error);
}

export function isNetworkError(error: any): boolean {
  return !error.response && error.request;
}

export function isAuthError(error: any): boolean {
  return error.response?.status === 401;
}