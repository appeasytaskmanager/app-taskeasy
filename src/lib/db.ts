import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Configuração do Neon para otimizar conexões
neonConfig.fetchConnectionCache = true;

// URL de conexão do banco de dados
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL não está definida nas variáveis de ambiente");
}

// Criar cliente Neon
const sql = neon(connectionString);

// Criar instância do Drizzle ORM
export const db = drizzle(sql);

// Exportar também o cliente SQL para queries diretas (se necessário)
export { sql };
