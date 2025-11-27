# Contexto do Projeto App-TaskEasy

## 📋 Visão Geral
**EasyTask Manager App** é uma aplicação web completa de gerenciamento de tarefas desenvolvida com **Next.js 16**, **React 19**, **TypeScript** e **Drizzle ORM**. O projeto implementa um sistema robusto com autenticação JWT, banco de dados PostgreSQL serverless e API RESTful type-safe.

---

## 📊 Informações do Projeto

### Stack Tecnológico
- **Framework Frontend**: Next.js 16.0.1 (App Router)
- **Linguagem**: TypeScript 5
- **Banco de Dados**: PostgreSQL Serverless (Neon Database)
- **ORM**: Drizzle ORM v0.44.7
- **Autenticação**: JWT + bcryptjs
- **Styling**: Tailwind CSS v4 + PostCSS v4
- **UI Components**: Radix UI + componentes customizados
- **Icons**: Lucide React
- **Runtime**: Node.js

### Versões Principais
- Next.js: 16.0.1
- React: 19.2.0
- TypeScript: 5
- Tailwind CSS: 4
- Drizzle ORM: 0.44.7

---

## 📁 Estrutura de Pastas

```
app-taskeasy/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── globals.css              # Estilos globais com Tailwind
│   │   ├── layout.tsx               # Layout raiz (HTML, metadados)
│   │   ├── page.tsx                 # Página principal
│   │   ├── (pages)/                 # Agrupamento de rotas (grupos)
│   │   │   ├── auth/                # Rotas de autenticação
│   │   │   │   ├── login/           # Página de login
│   │   │   │   └── register/        # Página de registro
│   │   │   └── dashboard/           # Rotas do dashboard
│   │   │       └── page.tsx         # Página do dashboard
│   │   └── api/                     # API Routes (Backend)
│   │       ├── auth/
│   │       │   ├── register/        # POST /api/auth/register
│   │       │   └── sign/            # POST /api/auth/sign (login)
│   │       ├── profile/             # GET/PUT /api/profile
│   │       ├── users/               # Endpoints de usuários
│   │       └── test-db/             # Teste de conexão BD
│   │
│   ├── components/                  # Componentes React reutilizáveis
│   │   ├── ui/                      # Componentes UI base
│   │   └── view/                    # Componentes de visualização
│   │
│   ├── db/                          # Configuração e schemas do banco
│   │   ├── index.ts                 # Exportações do módulo DB
│   │   └── schema/                  # Definições de tabelas
│   │       ├── index.ts             # Exportações de schemas
│   │       ├── users.ts             # Tabela: users
│   │       └── tasks.ts             # Tabela: tasks
│   │
│   └── lib/                         # Funções utilitárias e configurações
│       ├── auth.ts                  # Middleware de autenticação JWT
│       ├── db.ts                    # Instância do Drizzle ORM
│       └── utils.ts                 # Funções auxiliares
│
├── public/                          # Arquivos estáticos públicos
├── drizzle/                         # Migrations geradas (auto-criada)
├── docs/                            # Documentação
│   ├── database-setup.md            # Guia de configuração do Neon DB
│   └── drizzle-setup.md             # Guia do Drizzle ORM
│
├── .env.local                       # Variáveis de ambiente (local)
├── .env.production.example          # Exemplo para produção
├── package.json                     # Dependências e scripts
├── tsconfig.json                    # Configuração TypeScript
├── next.config.ts                   # Configuração Next.js
├── eslint.config.mjs                # Configuração ESLint
├── postcss.config.mjs               # Configuração PostCSS
├── tailwind.config.js               # Configuração Tailwind CSS
├── components.json                  # Configuração Shadcn/ui
├── drizzle.config.ts                # Configuração Drizzle ORM
├── next-env.d.ts                    # Tipos do Next.js
├── Dockerfile                       # Containerização Docker
├── docker-compose.yml               # Compose para dev
├── docker-compose.prod.yml          # Compose para produção
├── README.md                        # Documentação geral
├── CONTEXT.md                       # Este arquivo
└── scripts/
    └── should-build.sh              # Script de build automático

```

---

## 🗄️ Banco de Dados

### Configuração
- **Provedor**: Neon (PostgreSQL Serverless)
- **ORM**: Drizzle ORM (type-safe)
- **Conexão**: HTTP via `@neondatabase/serverless`
- **Variável de Ambiente**: `DATABASE_URL`

### Schemas (Tabelas)

#### `users` (src/db/schema/users.ts)
```typescript
{
  id: uuid (PK, auto-gerado)
  email: varchar[255] (unique, not null)
  name: varchar[255]
  password: varchar[255] (hash bcrypt)
  createdAt: timestamp (default: now)
  updatedAt: timestamp (default: now)
  isActive: boolean (default: true)
}
```
- Relacionamento: Um usuário pode ter múltiplas tarefas
- Tipos TypeScript: `User`, `NewUser`

#### `tasks` (src/db/schema/tasks.ts)
```typescript
{
  id: uuid (PK, auto-gerado)
  title: varchar[255] (not null)
  description: text
  status: enum["pending", "in_progress", "completed", "cancelled"]
  userId: uuid (FK → users.id, cascade delete)
  dueDate: timestamp
  completedAt: timestamp
  createdAt: timestamp (default: now)
  updatedAt: timestamp (default: now)
  isDeleted: boolean (default: false, soft delete)
}
```
- Relacionamento: Cada tarefa pertence a um usuário
- Tipos TypeScript: `Task`, `NewTask`

### Instância Drizzle (src/lib/db.ts)
```typescript
- Conexão via Neon HTTP
- Cache de conexões habilitado
- Validação de DATABASE_URL
```

---

## 🔐 Autenticação

### Sistema JWT
- **Middleware**: `src/lib/auth.ts` - `authMiddleware()`
- **Secret**: Variável `JWT_SECRET`
- **Header**: `Authorization: Bearer <token>`

### Fluxo de Autenticação

#### 1. Registro (`POST /api/auth/register`)
```
Corpo: { name, email, password }
↓
Valida campos obrigatórios
↓
Verifica email existente (SELECT)
↓
Hash da senha (bcryptjs, salt: 10)
↓
Insere novo usuário (INSERT)
↓
Retorna dados do usuário
```

#### 2. Login (`POST /api/auth/sign`)
- Valida email e senha
- Compara hash bcrypt
- Gera token JWT
- Retorna token e dados do usuário

#### 3. Middleware de Proteção
- Valida presença do header `Authorization`
- Extrai token do padrão `Bearer <token>`
- Verifica e decodifica JWT
- Extrai `userId` do payload
- Retorna erro 401 se inválido/expirado

### Segurança
- Senhas: Hash bcrypt com salt 10
- Tokens: Assinados com JWT_SECRET
- Headers: Validação obrigatória de Authorization
- Type-safe: TypeScript para payloads

---

## 🚀 API Endpoints

### Autenticação
- `POST /api/auth/register` - Criar novo usuário
- `POST /api/auth/sign` - Login (retorna JWT)

### Perfil
- `GET /api/profile` - Obter perfil do usuário (autenticado)
- `PUT /api/profile` - Atualizar perfil (autenticado)

### Usuários
- `GET /api/users` - Listar usuários (admin)
- `GET /api/users/[id]` - Obter usuário específico

### Tarefas
- `GET /api/tasks` - Listar tarefas do usuário
- `POST /api/tasks` - Criar tarefa
- `PUT /api/tasks/[id]` - Atualizar tarefa
- `DELETE /api/tasks/[id]` - Deletar tarefa

### Utilitários
- `GET /api/test-db` - Testar conexão com banco

---

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                    # Inicia servidor dev (http://localhost:3000)

# Build e Produção
pnpm build                  # Build para produção
pnpm start                  # Inicia servidor de produção

# Linting
pnpm lint                   # Verifica erros ESLint

# Banco de Dados (Drizzle)
pnpm db:generate            # Gera migration baseada em schema
pnpm db:migrate             # Executa migrations pendentes
pnpm db:push                # Sincroniza schema com BD (dev)
pnpm db:studio              # Abre Drizzle Studio (UI para BD)
```

---

## 🔧 Configurações Principais

### `next.config.ts`
```typescript
- Redireciona "/" para "/auth/login" (público não autenticado)
- Configuração padrão do Next.js 16
```

### `drizzle.config.ts`
```typescript
- Dialect: PostgreSQL
- Schema: src/db/schema/index.ts
- Migrations: ./drizzle/
- Credenciais: DATABASE_URL (env)
```

### `tsconfig.json`
```typescript
- Target: ES6+
- Strict mode ativado
- Module resolution: bundler
- Path alias: @/* → raiz do projeto
```

### `tailwind.config.js`
- Tailwind CSS v4
- Tema customizável
- Dark mode support

### Font
- Poppins (Google Fonts)
- Weights: 100-900
- CSS variable: `--font-poppins`

---

## 📚 Dependências Principais

### Banco de Dados
- `drizzle-orm`: ORM type-safe para TypeScript
- `drizzle-kit`: CLI para migrations e schemas
- `@neondatabase/serverless`: Cliente HTTP para Neon

### Autenticação
- `jsonwebtoken`: Geração e verificação de JWT
- `bcryptjs`: Hash seguro de senhas
- `@types/jsonwebtoken`: Tipos TypeScript para JWT

### UI e Styling
- `@radix-ui/react-slot`: Primitiva Radix UI
- `lucide-react`: Ícones modernos
- `class-variance-authority`: Gestão de variantes
- `clsx`: Merge de classes condicionais
- `tailwind-merge`: Merge de classes Tailwind

### Ferramentas
- `dotenv`: Carregamento de variáveis de ambiente
- `@tailwindcss/postcss`: PostCSS plugin Tailwind v4
- `tailwindcss`: Framework CSS utility-first
- `eslint`: Linter de código
- `typescript`: Tipagem estática

---

## 🌐 Variáveis de Ambiente

Criar arquivo `.env.local`:
```env
# Banco de Dados (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Autenticação JWT
JWT_SECRET=sua-chave-secreta-muito-segura

# URLs (opcional)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Para produção, usar `.env.production.example` como referência.

---

## 🐳 Docker

### `Dockerfile`
- Imagem base: Node.js
- Multi-stage build
- Otimizado para produção

### `docker-compose.yml` (Desenvolvimento)
- Serviço Next.js
- Portas e volumes configurados
- Variáveis de ambiente

### `docker-compose.prod.yml` (Produção)
- Otimizações para produção
- Build otimizado
- Configuração de restart

---

## 📖 Documentação

### `docs/database-setup.md`
- Guia completo para Neon Database
- Configuração de variáveis de ambiente
- Testes de conexão
- Troubleshooting

### `docs/drizzle-setup.md`
- Guia do Drizzle ORM
- Estrutura de schemas
- Comandos e workflows
- Exemplos de queries CRUD
- Boas práticas

---

## 🎨 Design e UI

### Componentes
- `components/ui/` - Componentes base reutilizáveis
- `components/view/` - Componentes de páginas/views
- Todos os componentes usam Tailwind CSS

### Estilos
- CSS global em `src/app/globals.css`
- Tailwind CSS classes
- PostCSS para processamento
- Theme com next-themes (opcional)

### Layout
- Responsive design
- Mobile-first approach
- Flex e Grid para layouts
- Componentes acessíveis (Radix UI)

---

## 🔄 Workflow de Desenvolvimento

### 1. Criar novo Schema
- Editar `src/db/schema/*.ts`
- Executar `pnpm db:generate`
- Executar `pnpm db:push`

### 2. Usar Drizzle nas APIs
```typescript
import { db } from '@/lib/db';
import { users, tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';

// SELECT
const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

// INSERT
const newTask = await db.insert(tasks).values({ title, userId }).returning();

// UPDATE
await db.update(tasks).set({ status: 'completed' }).where(eq(tasks.id, id));

// DELETE
await db.delete(tasks).where(eq(tasks.id, id));
```

### 3. Proteger Rotas
```typescript
import { authMiddleware } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { userId, response } = authMiddleware(req);
  
  if (!userId) return response; // Não autenticado
  
  // Lógica da rota...
  return NextResponse.json({ /* dados */ });
}
```

---

## 📊 Features Implementadas

✅ **Autenticação JWT**
- Register com validação
- Login com token
- Middleware de proteção
- Hash bcrypt de senhas

✅ **Banco de Dados**
- PostgreSQL Serverless (Neon)
- Drizzle ORM type-safe
- Schemas tipados
- Migrations automáticas

✅ **API RESTful**
- Endpoints seguros
- Validação de entrada
- Tratamento de erros
- Type-safe com TypeScript

✅ **Frontend**
- Next.js App Router
- Componentes reutilizáveis
- Tailwind CSS
- Responsive design

---

## 📝 Convenções de Código

### Estrutura
- Componentes em `PascalCase`
- Arquivos em `lowercase`
- Pastas com nomes descritivos
- Path aliases com `@/`

### TypeScript
- Strict mode ativado
- Sempre tipifique variáveis e funções
- Use tipos inferidos do Drizzle

### Imports
- Organize por tipo (React, Next, DB, lib)
- Use path aliases `@/`
- Agrupe imports relacionados

### Naming
- Funções: `camelCase` ou `verbAction`
- Constantes: `UPPER_SNAKE_CASE`
- Variáveis: `camelCase`
- Tipos: `PascalCase`

---

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)
- Conta no Neon Database

### Setup Inicial
```bash
# 1. Clonar repositório
git clone <repo>
cd app-taskeasy

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
# Copiar .env.production.example para .env.local
# Preenchher DATABASE_URL e JWT_SECRET

# 4. Testar conexão com BD
pnpm db:push

# 5. Iniciar desenvolvimento
pnpm dev

# 6. Acessar
# http://localhost:3000 → redireciona para /auth/login
```

---

## 🔍 Troubleshooting

### Erro: "DATABASE_URL não está definida"
- Verificar se `.env.local` existe
- Verificar se `DATABASE_URL` está preenchido
- Verificar se a URL é válida (formato: `postgresql://...`)

### Erro: "Token inválido ou expirado"
- Verificar se `JWT_SECRET` está configurado
- Verificar se o token não está expirado
- Fazer login novamente

### Erro: "Email já registrado"
- Verificar se o email já existe
- Usar email diferente ou fazer login

### Migrations falhando
- Executar `pnpm db:generate` para criar migration
- Verificar schema em `src/db/schema/`
- Executar `pnpm db:push` ou `pnpm db:migrate`

---

## 📌 Próximas Etapas Recomendadas

- [ ] Implementar refresh tokens
- [ ] Adicionar validação de email
- [ ] Implementar recuperação de senha
- [ ] Adicionar testes unitários/integração
- [ ] Configurar CI/CD (GitHub Actions)
- [ ] Implementar rate limiting
- [ ] Adicionar logging
- [ ] Documentar endpoints com OpenAPI/Swagger
- [ ] Setup de monitoring e alertas
- [ ] Deploy em produção

---

## 🔗 Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Neon Database Documentation](https://neon.tech/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

---

**Última atualização**: 26 de Novembro de 2025
**Branch Atual**: criacao-dashboard
**Repositório**: appeasytaskmanager/app-taskeasy
