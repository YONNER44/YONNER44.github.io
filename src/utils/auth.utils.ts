// src/utils/auth.utils.ts
/**
 * Utilidades para autenticación y manejo de email
 */

const EMAIL_STORAGE_KEY = "userEmail";
const AUTH_TOKEN_STORAGE_KEY = "authToken";

export const authUtils = {
  /**
   * Guardar email del usuario
   */
  setUserEmail(email: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(EMAIL_STORAGE_KEY, email);
    }
  },

  /**
   * Obtener email del usuario
   */
  getUserEmail(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(EMAIL_STORAGE_KEY);
    }
    return null;
  },

  /**
   * Limpiar email del usuario
   */
  clearUserEmail(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(EMAIL_STORAGE_KEY);
    }
  },

  /**
   * Guardar token de autenticación
   */
  setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    }
  },

  /**
   * Obtener token de autenticación
   */
  getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    }
    return null;
  },

  /**
   * Limpiar token de autenticación
   */
  clearAuthToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    }
  },

  /**
   * Limpiar todo (logout)
   */
  logout(): void {
    this.clearUserEmail();
    this.clearAuthToken();
  },
};