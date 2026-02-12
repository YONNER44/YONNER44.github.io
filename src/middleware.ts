// src/middleware.ts
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  
  // Rutas protegidas
  const protectedRoutes = ['/projectsConfig'];
  
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = context.cookies.get('authToken')?.value;
    
    if (!token) {
      return context.redirect('/');
    }
  }
  
  return next();
});