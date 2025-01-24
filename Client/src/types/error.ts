// Define error types for type safety
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export type ValidationError = {
  field: string;
  message: string;
};

// HTTP status codes as constants
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;