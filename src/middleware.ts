// src/middleware.ts
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_, next) => {
  // En despliegue estatico (GitHub Pages) no existe proteccion real por request.
  // La validacion de acceso se realiza en cliente en las vistas protegidas.
  return next();
});
