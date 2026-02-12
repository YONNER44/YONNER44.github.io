export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Cambio: Ya no incluye email
export interface PasswordRequest {
  // El backend obtiene el email automáticamente
}

export interface PasswordValidation {
  // El backend obtiene el email automáticamente
  password: string;
}

export interface PasswordResponse {
  valid?: boolean;
  success: boolean;
  message: string;
  token?: string; 
}

export interface ApiError {
  status: number;
  message: string;
  details?: any;
}