export const API_CONFIG = {
  BASE_URL: import.meta.env.PUBLIC_API_URL || "http://localhost:3001",
  TIMEOUT: 10000,
  ENDPOINTS: {
    AUTH: {
      REQUEST_PASSWORD: "/api/request-password",
      VALIDATE_PASSWORD: "/api/validate-password",
    },
    // Aquí irán otros endpoints cuando los necesites
    // USERS: { ... },
    // PROJECTS: { ... },
  },
} as const;