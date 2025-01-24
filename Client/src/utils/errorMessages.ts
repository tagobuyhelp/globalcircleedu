// Centralized error messages
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already exists',
  WEAK_PASSWORD: 'Password must be at least 8 characters long',
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  INVALID_EMAIL: 'Invalid email format',
  UNAUTHORIZED: 'Please login to continue',
  SESSION_EXPIRED: 'Your session has expired',
} as const;

export const VALIDATION_ERRORS = {
  REQUIRED: 'This field is required',
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must not exceed ${max} characters`,
  INVALID_FORMAT: 'Invalid format',
  INVALID_OPTION: 'Invalid option selected',
} as const;

export const API_ERRORS = {
  NETWORK_ERROR: 'Network error occurred',
  SERVER_ERROR: 'Server error occurred',
  NOT_FOUND: 'Resource not found',
  FORBIDDEN: 'You do not have permission to perform this action',
} as const;