export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    _id: string;
    username: string;
    email: string;
    role: string;
    token: string;
  };
  message: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  createdAt?: string;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}

export type UserRole = 'admin' | 'administrator' | 'agent' | 'visitor';
