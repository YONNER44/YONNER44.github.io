import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Arca Software",
  DESCRIPTION: "Bienvenido a Arca Software, un portafolio de diseñador y desarrollador.",
  AUTHOR: "Yonner Vargas",
}

// Work Page
export const WORK: Page = {
  TITLE: "Trabajo",
  DESCRIPTION: "Lugares donde he trabajado.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Cv",
  DESCRIPTION: "Detalles del currículum vitae.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Proyectos",
  DESCRIPTION: "Proyectos recientes en los que he trabajado.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Buscar",
  DESCRIPTION: "Buscar todos los posts y proyectos por palabra clave.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Inicio", 
    HREF: "/", 
  },
  { 
    TEXT: "Trabajo", 
    HREF: "/work", 
  },
  { 
    TEXT: "Cv", 
    HREF: "/blog", 
  },
  { 
    TEXT: "Proyectos", 
    HREF: "/projects", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "yonnervargasbernate7@gmail.com",
    HREF: "mailto:yonnervargasbernate7@gmail.com",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "YONNER44",
    HREF: "https://github.com/YONNER44",
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "yonnervargasbernate",
    HREF: "https://www.linkedin.com/in/yonnervargas",
  },
]

