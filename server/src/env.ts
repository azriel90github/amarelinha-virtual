import z from "zod";
import "dotenv/config"; // Importa as variáveis de ambiente antes de tudo

// Define o esquema para as variáveis de ambiente
const envSchema = z.object({
  DATABASE_URL: z.string().url(), // URL do banco de dados
  GOOGLE_DRIVE_CLIENT_ID: z.string(), // Client ID do Google Drive
  GOOGLE_DRIVE_CLIENT_SECRET: z.string(), // Client Secret do Google Drive
  GOOGLE_DRIVE_REFRESH_TOKEN: z.string(), // Refresh Token do Google Drive
  GOOGLE_DRIVE_FOLDER_ID: z.string(), // ID da pasta no Google Drive
  EMAIL_USER: z.string().email(), // Email do remetente
  EMAIL_PASSWORD: z.string().min(8), // Senha do email
  HAMBURGUERIA_EMAIL: z.string().email(), // Email da hamburgueria
});

// Valida as variáveis de ambiente
export const env = envSchema.parse(process.env);