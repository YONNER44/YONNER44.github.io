export type InstallationStep = {
  id: number;
  text: string;
};

export type CodeSnippet = {
  title: string;
  language: string;
  code: string;
};

export type InstallationSection = {
  id: string;
  title: string;
  steps: InstallationStep[];
  snippets: CodeSnippet[];
};

const envSnippet = `# Configuración de la aplicación
PORT=3000
NODE_ENV=development
APP_ENV=development

# ...pega aquí todo tu bloque .env completo...
`;

export const internshipConfigData = {
  title: "Pasos para la instalación del proyecto.",
  sections: [
    {
      id: "backend-setup",
      title: "Backend",
      steps: [
        { id: 1, text: "Instalar Docker y activar virtualización en BIOS." },
        { id: 2, text: "Instalar PostgreSQL." },
        { id: 3, text: "Crear el archivo .env y pegar este bloque." },
      ],
      snippets: [
        {
          title: ".env",
          language: "ini",
          code: envSnippet,
        },
      ],
    },
    {
      id: "run-project",
      title: "Ejecución",
      steps: [{ id: 4, text: "Ejecutar el comando:" }],
      snippets: [
        {
          title: "Comando para ejecutar el proyecto Backend",
          language: "bash",
          code: `npm install --legacy-peer-deps`,
        },
      ],
    },
    {
      id: "run-project-2",
      title: "Ejecución",
      steps: [{ id: 5, text: "Ejecutar el comando para limpiar la terminal:" }],
      snippets: [
        {
          title: "Limpiar la terminal",
          language: "bash",
          code: `clear`,
        },
      ],
    },
    {
      id: "run-project-3",
      title: "Ejecución",
      steps: [
        {
          id: 6,
          text: "Ejecutamos estos comando uno por uno después de finalizar cada uno.",
        },
      ],
      snippets: [
        {
          title: "Generar el build sin cache",
          language: "bash",
          code: `docker compose build --no-cache backend`,
        },
        {
          title: "Levantar docker (perfil full)",
          language: "bash",
          code: `docker compose --profile full up -d`,
        },
        {
          title: "Ejecutar migraciones (dev)",
          language: "bash",
          code: `docker-compose exec backend npm run db:migrate:dev`,
        },
        {
          title: "Generar Prisma",
          language: "bash",
          code: `docker-compose exec backend npx prisma generate`,
        },
        {
          title: "Ejecutar migraciones nuevamente (dev)",
          language: "bash",
          code: `docker-compose exec backend npm run db:migrate:dev`,
        },
        {
          title: "Seed general",
          language: "bash",
          code: `docker compose exec backend sh -c "cd /app && npx ts-node scripts/seed/seed.ts"`,
        },
        {
          title: "Seed usuarios",
          language: "bash",
          code: `docker compose exec backend sh -c "cd /app && npx ts-node scripts/seed/seed-users.ts"`,
        },
        {
          title: "Seed catálogos",
          language: "bash",
          code: `docker compose exec backend sh -c "cd /app && npx ts-node scripts/seed/seed-catalogs.ts"`,
        },
        {
          title: "Bajar docker (perfil full)",
          language: "bash",
          code: `docker compose --profile full down`,
        },
      ],
    },
    {
      id: "run-project-4",
      steps: [
        {
          id: 7,
          text: "Por ultimo validamos que este corriendo en el doker si no damos a flecha para iniciar.",
        },
      ],
      snippets: [],
    },
    {
      id: "run-project-5",
      title: "Pasos instalacion proyecto: Front",
      steps: [
        {
          id: 8,
          text: "clonamos el proyecto importante el front y back se meten en una sola carpeta dentro de ella debe estar carpeta del front y back.",
        },
      ],
      snippets: [
        {
          title: "Instalamos dependencias",
          language: "bash",
          code: `npm install`,
        },
      ],
    },
    {
      id: "run-project-6",
      title: "Creamos el archivo .env.development",
      steps: [
        {
          id: 9,
          text: "Creamos el archivo .env.development y pegamos este bloque de código.",
        },
      ],
      snippets: [
        {
          title: ".env.development",
          language: "ini",
          code: `NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_NAME=InternshipHub
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_STATIC_FILES_URL=http://localhost:8080
PORT=3002`,
        },
      ],
    },
    {
      id: "run-project-7",
      title: "",
      steps: [
        {
          id: 10,
          text: "Ejecutamos el proyecto con el comando:",
        },
      ],
      snippets: [
        {
          title: "Comando para ejecutar el proyecto Frontend",
          language: "bash",
          code: `npm run dev`,
        },
      ],
    },
    {
      id: "run-project-8",
      title:
        "Comando importante para inicalizar servidor base de datos PostgreSQL",
      steps: [],
      snippets: [
        {
          title: "Iniciar servidor PostgreSQL",
          language: "bash",
          code: `docker start development-postgres`,
        },
      ],
    },
    {
      id: "run-project-9",
      title:
        "Comando para ver en swagger lista de apis:",
      steps: [],
      snippets: [
        {
          title: "Ver lista de APIs en Swagger",
          language: "bash",
          code: `http://localhost:3000/api/v1/docs#/Dashboard%20de%20Proveedores/ProviderDashboardController_getProviderServices`,
        },
      ],
    },
  ] as InstallationSection[],
};
