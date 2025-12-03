import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Configuração do Neon
neonConfig.fetchConnectionCache = true;

// Validação da DATABASE_URL
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "❌ DATABASE_URL não está definida nas variáveis de ambiente. " +
      "Verifique seu arquivo .env.local ou configurações da Vercel."
  );
}

// Validação adicional para ambiente de produção
if (process.env.NODE_ENV === "production") {
  // Verifica se está usando pooled connection (recomendado para Vercel)
  if (!connectionString.includes("-pooler")) {
    console.warn(
      "⚠️ AVISO: Você está usando Direct Connection. " +
        "Para melhor performance na Vercel, use Pooled Connection (URL com '-pooler')."
    );
  }

  // Verifica se tem SSL configurado
  if (!connectionString.includes("sslmode=require")) {
    console.warn(
      "⚠️ AVISO: Connection string sem 'sslmode=require'. " +
        "O Neon requer SSL em produção."
    );
  }
}

// Criar cliente Neon
const sql = neon(connectionString);

// Criar instância do Drizzle ORM
export const db = drizzle(sql);

// Exportar também o cliente SQL para queries diretas (se necessário)
export { sql };

// Log de inicialização (apenas em desenvolvimento)
if (process.env.NODE_ENV === "development") {
  console.log("✅ Banco de dados conectado");
}
