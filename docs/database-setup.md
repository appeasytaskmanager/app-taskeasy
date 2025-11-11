# 🗄️ Configuração do Neon Database

> Guia completo para configurar e conectar o projeto ao Neon PostgreSQL Database

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Obter URL de Conexão](#1-obter-url-de-conexão)
- [Configurar Variáveis de Ambiente](#2-configurar-variáveis-de-ambiente)
- [Testar Conexão](#3-testar-conexão)
- [Usar o Banco de Dados](#4-usar-o-banco-de-dados)
- [Comandos Úteis do Neon](#5-comandos-úteis-do-neon)
- [Segurança](#6-segurança)
- [Troubleshooting](#7-troubleshooting)
- [Próximos Passos](#8-próximos-passos)
- [Recursos Adicionais](#9-recursos-adicionais)

## Visão Geral

Este projeto utiliza o **Neon Database**, um PostgreSQL serverless moderno que oferece:

- ✅ Auto-scaling automático
- ✅ Branching de banco de dados (como Git)
- ✅ Conexões serverless sem configuração complexa
- ✅ Compatível com PostgreSQL padrão
- ✅ Interface web intuitiva

O projeto está configurado com **Drizzle ORM** para trabalhar com o banco de dados de forma type-safe. Para mais detalhes sobre o Drizzle, consulte o [Guia do Drizzle ORM](./drizzle-setup.md).

## Pré-requisitos

- Conta no [Neon Database](https://neon.tech) (gratuita)
- Node.js 18+ instalado
- Variável de ambiente `DATABASE_URL` configurada

## 1. Obter URL de Conexão

### Passo a Passo

1. **Acesse o Dashboard do Neon**

   - Visite [https://console.neon.tech](https://console.neon.tech)
   - Faça login na sua conta

2. **Crie ou Selecione um Projeto**

   - Se você ainda não tem um projeto, clique em **"Create Project"**
   - Escolha um nome para o projeto (ex: `easytask-manager`)
   - Selecione a região mais próxima
   - Escolha a versão do PostgreSQL (recomendado: 16)

3. **Obtenha a Connection String**
   - No dashboard do projeto, vá em **"Connection Details"** ou **"Settings"**
   - Copie a **Connection String** no formato:
     ```
     postgresql://user:password@ep-xxxxx.region.aws.neon.tech/database?sslmode=require
     ```

### Formato da Connection String

```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

**Componentes:**

- `user`: Nome de usuário do banco
- `password`: Senha do banco
- `host`: Endpoint do Neon (ex: `ep-xxxxx.us-east-2.aws.neon.tech`)
- `database`: Nome do banco de dados (padrão: `neondb`)
- `sslmode=require`: Requer conexão SSL (obrigatório)

## 2. Configurar Variáveis de Ambiente

### Desenvolvimento Local

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Neon Database Connection
DATABASE_URL=postgresql://user:password@ep-xxxxx.region.aws.neon.tech/database?sslmode=require

# Next.js (opcional)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Importante:**

- O arquivo `.env.local` é ignorado pelo Git (não será commitado)
- Nunca commite credenciais de banco de dados
- Use `.env.local` para desenvolvimento local

### Produção (Docker)

Para ambientes de produção usando Docker, adicione a `DATABASE_URL` no arquivo `.env` usado pelo `docker-compose.prod.yml`:

```env
# Neon Database Connection
DATABASE_URL=postgresql://user:password@ep-xxxxx.region.aws.neon.tech/database?sslmode=require

# Ambiente
NODE_ENV=production
PORT=3000
```

**Segurança em Produção:**

- Use variáveis de ambiente do seu provedor de hospedagem
- Não armazene credenciais em arquivos versionados
- Rotacione senhas regularmente

### Variáveis de Ambiente por Ambiente

| Ambiente          | Arquivo                | Quando Usar           |
| ----------------- | ---------------------- | --------------------- |
| Desenvolvimento   | `.env.local`           | Desenvolvimento local |
| Produção (Docker) | `.env`                 | Deploy com Docker     |
| Produção (Vercel) | Variáveis do Dashboard | Deploy na Vercel      |
| Produção (Outros) | Variáveis do Servidor  | Deploy em servidores  |

## 3. Testar Conexão

### Método 1: API Route de Teste

Após configurar a `DATABASE_URL`, teste a conexão:

1. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

2. **Acesse o endpoint de teste:**

   ```
   http://localhost:3000/api/test-db
   ```

3. **Verifique a resposta:**
   ```json
   {
     "success": true,
     "message": "Conexão com Neon Database e Drizzle ORM estabelecida com sucesso!",
     "data": {
       "sqlDirect": {
         "currentTime": "2024-01-01T12:00:00.000Z",
         "postgresVersion": "PostgreSQL 16.0"
       },
       "drizzle": {
         "userCount": 0,
         "message": "Drizzle ORM está funcionando corretamente"
       }
     }
   }
   ```

### Método 2: Drizzle Studio

Use o Drizzle Studio para visualizar e gerenciar dados:

```bash
npm run db:studio
```

Isso abrirá uma interface web em `http://localhost:4983` onde você pode:

- Visualizar tabelas e dados
- Executar queries
- Editar dados diretamente

### Método 3: CLI do Neon

Teste a conexão diretamente via CLI:

```bash
npx neonctl connection-string
```

## 4. Usar o Banco de Dados

O projeto está configurado com **Drizzle ORM** para trabalhar com o banco de dados de forma type-safe.

### Drizzle ORM (Recomendado)

Para documentação completa sobre o Drizzle ORM, consulte o [Guia do Drizzle ORM](./drizzle-setup.md).

**Exemplo rápido:**

```typescript
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Listar usuários
const allUsers = await db.select().from(users);

// Buscar usuário por ID
const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);

// Criar usuário
const newUser = await db
  .insert(users)
  .values({
    email: "user@example.com",
    name: "John Doe",
  })
  .returning();
```

### SQL Direto (Alternativa)

Se precisar usar SQL direto (não recomendado para novos códigos), você pode usar o cliente `sql`:

```typescript
import { sql } from "@/lib/db";

// Query simples
const users = await sql`SELECT * FROM users`;

// Query com parâmetros (proteção contra SQL injection)
const user = await sql`SELECT * FROM users WHERE id = ${userId}`;
```

**Quando usar SQL direto:**

- Queries muito complexas que o ORM não suporta bem
- Migrations personalizadas
- Queries de relatório ou analytics

## 5. Comandos Úteis do Neon

### Conectar ao Banco via CLI

```bash
# Obter connection string
npx neonctl connection-string

# Listar todos os projetos
npx neonctl projects list

# Ver detalhes de um projeto
npx neonctl projects describe <project-id>
```

### Gerenciar Branches

O Neon suporta branching de banco de dados, permitindo criar ambientes isolados:

```bash
# Listar branches
npx neonctl branches list

# Criar branch (útil para desenvolvimento)
npx neonctl branches create --name develop

# Deletar branch
npx neonctl branches delete <branch-id>
```

### Gerenciar Computes (Endpoints)

```bash
# Listar computes
npx neonctl computes list

# Criar compute
npx neonctl computes create --name my-compute

# Pausar compute (economiza recursos)
npx neonctl computes suspend <compute-id>
```

### Operações de Banco de Dados

```bash
# Executar SQL
npx neonctl sql "SELECT * FROM users"

# Criar backup
npx neonctl backups create

# Restaurar backup
npx neonctl backups restore <backup-id>
```

## 6. Segurança

### Boas Práticas

- ✅ **NUNCA** commite o arquivo `.env.local` ou `.env` no Git
- ✅ Use variáveis de ambiente no servidor de produção
- ✅ O arquivo `.env.example` serve apenas como template
- ✅ A `DATABASE_URL` contém credenciais sensíveis
- ✅ Rotacione senhas regularmente
- ✅ Use branches separadas para desenvolvimento e produção
- ✅ Habilite SSL/TLS (obrigatório no Neon)

### Checklist de Segurança

- [ ] `.env.local` está no `.gitignore`
- [ ] `.env` está no `.gitignore`
- [ ] Credenciais não estão em arquivos versionados
- [ ] Variáveis de ambiente estão configuradas no servidor
- [ ] SSL está habilitado (`sslmode=require`)
- [ ] Senhas são fortes e únicas
- [ ] Acesso ao banco está restrito por IP (se possível)

### Rotação de Senhas

Para rotacionar a senha do banco:

1. Acesse o dashboard do Neon
2. Vá em **Settings** → **Database**
3. Clique em **Reset Password**
4. Atualize a `DATABASE_URL` em todos os ambientes

## 7. Troubleshooting

### Erro: "DATABASE_URL não está definida"

**Solução:**

- Verifique se o arquivo `.env.local` existe na raiz do projeto
- Certifique-se de que a variável `DATABASE_URL` está definida
- Reinicie o servidor de desenvolvimento após criar/editar `.env.local`

### Erro: "Connection refused" ou "Timeout"

**Possíveis causas:**

- URL de conexão incorreta
- Firewall bloqueando conexões
- Compute do Neon está pausado

**Solução:**

- Verifique a URL de conexão no dashboard do Neon
- Certifique-se de que o compute está ativo
- Verifique as configurações de firewall

### Erro: "SSL connection required"

**Solução:**

- Adicione `?sslmode=require` no final da `DATABASE_URL`
- Certifique-se de que a URL está completa

### Erro: "Relation does not exist"

**Solução:**

- Execute as migrations: `npm run db:push` ou `npm run db:migrate`
- Verifique se os schemas estão definidos corretamente
- Consulte o [Guia do Drizzle ORM](./drizzle-setup.md) para mais detalhes

### Performance Lenta

**Possíveis causas:**

- Compute do Neon está pausado (cold start)
- Muitas conexões simultâneas
- Queries não otimizadas

**Solução:**

- Mantenha o compute ativo durante desenvolvimento
- Use connection pooling
- Otimize queries com índices

## 8. Próximos Passos

Após configurar o banco de dados:

1. **Configure o Drizzle ORM**

   - Consulte o [Guia do Drizzle ORM](./drizzle-setup.md)
   - Crie seus schemas
   - Execute as migrations

2. **Crie suas Tabelas**

   - Defina schemas em `src/db/schema/`
   - Gere migrations: `npm run db:generate`
   - Aplique migrations: `npm run db:push`

3. **Desenvolva suas APIs**

   - Use o Drizzle ORM nas API routes
   - Consulte exemplos em `src/app/api/`

4. **Teste sua Aplicação**
   - Use o Drizzle Studio para visualizar dados
   - Teste as APIs com ferramentas como Postman ou Insomnia

## 9. Recursos Adicionais

### Documentação Oficial

- [Documentação do Neon](https://neon.tech/docs) - Documentação completa
- [Neon Dashboard](https://console.neon.tech) - Interface web
- [Neon CLI](https://neon.tech/docs/reference/neon-cli) - Documentação do CLI
- [Guia de Next.js com Neon](https://neon.tech/docs/guides/nextjs) - Integração com Next.js

### Documentação do Projeto

- [Guia do Drizzle ORM](./drizzle-setup.md) - Configuração e uso do Drizzle
- [README.md](../README.md) - Visão geral do projeto

### Comunidade

- [Discord do Neon](https://discord.gg/neondatabase) - Comunidade e suporte
- [GitHub do Neon](https://github.com/neondatabase) - Código fonte e issues
- [Twitter do Neon](https://twitter.com/neondatabase) - Atualizações

---

**📝 Nota:** Este documento é específico para a configuração do Neon Database. Para informações sobre o Drizzle ORM, consulte o [Guia do Drizzle ORM](./drizzle-setup.md).
