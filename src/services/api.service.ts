import { API_CONFIG } from "../config/api.config";
import type { ApiResponse, ApiError, PasswordRequest, PasswordValidation, PasswordResponse } from "../types/api.types";

class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Método privado para realizar peticiones HTTP
   */
  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          message: errorData.message || `Error ${response.status}`,
          details: errorData,
        } as ApiError;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        throw {
          status: 0,
          message: `No se pudo conectar al servidor en ${this.baseUrl}`,
          details: error,
        } as ApiError;
      }
      throw error;
    }
  }

  /**
   * Solicitar contraseña temporal (sin email, el backend lo obtiene automáticamente)
   */
  async requestPassword(): Promise<PasswordResponse> {
    return this.request<PasswordResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REQUEST_PASSWORD,
      {
        method: "POST",
        body: JSON.stringify({}),
      }
    );
  }

  /**
   * Validar contraseña (sin email, el backend lo obtiene automáticamente)
   */
  async validatePassword(password: string): Promise<PasswordResponse> {
    return this.request<PasswordResponse>(
      API_CONFIG.ENDPOINTS.AUTH.VALIDATE_PASSWORD,
      {
        method: "POST",
        body: JSON.stringify({ password }),
      }
    );
  }
}

// Exportar instancia única (singleton)
export const apiService = new ApiService();