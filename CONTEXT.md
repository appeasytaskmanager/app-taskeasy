# 📋 Contexto Completo - App TaskEasy

## 🎯 Visão Geral

**EasyTask Manager App** é uma aplicação web full-stack de gerenciamento de tarefas desenvolvida com **Next.js 16** (App Router), **React 19**, **TypeScript** e **Drizzle ORM**. A aplicação implementa um sistema robusto com autenticação JWT, banco de dados PostgreSQL serverless (Neon) e arquitetura em camadas (Controller → Service → Repository).

---

## 🏗️ Arquitetura da Aplicação

### Estrutura Geral
```
Frontend (Next.js App Router) ←→ API Routes (Next.js) ←→ Service Layer ←→ Repository Layer ←→ Database (PostgreSQL/Neon)
```

### Padrão de Arquitetura
- **Controller** (`src/modules/task.controller.ts`): Recebe requisições HTTP, valida entrada, chama services
- **Service** (`src/modules/task.service.ts`): Contém regras de negócio e validações
- **Repository** (`src/modules/task.repository.ts`): Abstrai acesso ao banco de dados via Drizzle ORM

---

## 🔧 Stack Tecnológico

### Frontend
- **Framework**: Next.js 16.0.1 (App Router)
- **UI Library**: React 19.2.0
- **Linguagem**: TypeScript 5
- **Styling**: Tailwind CSS v4 + PostCSS v4
- **Componentes UI**: Radix UI (primitivas acessíveis)
- **Ícones**: Lucide React
- **Temas**: next-themes (dark/light mode)
- **Gráficos**: Recharts 3.5.0

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **ORM**: Drizzle ORM v0.44.7 (type-safe)
- **Database**: PostgreSQL Serverless (Neon Database)
- **Cliente DB**: @neondatabase/serverless v1.0.2

### Autenticação & Segurança
- **JWT**: jsonwebtoken v9.0.2
- **Hash de Senhas**: bcryptjs v3.0.3
- **Middleware**: Custom auth middleware (`src/lib/auth.ts`)

### Ferramentas de Desenvolvimento
- **TypeScript**: 5.x
- **ESLint**: 9.x
- **Drizzle Kit**: 0.31.6 (migrations e schema management)
- **Docker**: Containerização (dev e produção)

---

## 📁 Estrutura de Pastas Detalhada

```
app-taskeasy/
├── src/
│   ├── app/                                    # Next.js App Router
│   │   ├── globals.css                         # Estilos globais Tailwind
│   │   ├── layout.tsx                          # Layout raiz (HTML, metadados, providers)
│   │   ├── page.tsx                            # Página inicial (redireciona para /auth/login)
│   │   │
│   │   ├── (pages)/                            # Grupo de rotas (não afeta URL)
│   │   │   ├── auth/                           # Rotas de autenticação
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx                # Página de login
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx                # Página de registro
│   │   │   │   └── forgot-password/
│   │   │   │       └── page.tsx                # Página de recuperação de senha
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx                    # Dashboard principal
│   │   │   │
│   │   │   ├── tasks/
│   │   │   │   └── page.tsx                    # Página de listagem de tarefas
│   │   │   │
│   │   │   └── reports/
│   │   │       └── page.tsx                    # Página de relatórios
│   │   │
│   │   ├── api/                                # API Routes (Backend)
│   │   │   ├── auth/
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts                # POST /api/auth/register
│   │   │   │   └── sign/
│   │   │   │       └── route.ts                # POST /api/auth/sign (login)
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   └── route.ts                    # GET/PUT /api/profile
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── route.ts                    # GET /api/users
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts                # GET /api/users/[id]
│   │   │   │
│   │   │   ├── tasks/
│   │   │   │   ├── route.ts                    # GET/POST /api/tasks
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts                # GET/PATCH/DELETE /api/tasks/[id]
│   │   │   │
│   │   │   └── test-db/
│   │   │       └── route.ts                    # GET /api/test-db (teste de conexão)
│   │   │
│   │   └── components/                         # Componentes React
│   │       ├── ui/                             # Componentes UI base (reutilizáveis)
│   │       │   ├── button.tsx
│   │       │   ├── card.tsx
│   │       │   ├── chart.tsx
│   │       │   ├── input.tsx
│   │       │   ├── logo.tsx
│   │       │   ├── separator.tsx
│   │       │   └── index.ts                    # Exportações centralizadas
│   │       │
│   │       └── view/                           # Componentes de visualização (páginas)
│   │           ├── auth/
│   │           │   ├── login/
│   │           │   │   └── login.tsx
│   │           │   ├── register/
│   │           │   │   └── cadastro.tsx
│   │           │   └── forgot/
│   │           │       └── forgot.tsx
│   │           │
│   │           ├── dashboard/                  # Componentes do Dashboard
│   │           │   ├── sidebar.tsx             # Menu lateral
│   │           │   ├── header.tsx              # Cabeçalho com navegação
│   │           │   ├── metric-cards.tsx        # Cards de métricas
│   │           │   ├── tasks-list.tsx          # Lista de tarefas
│   │           │   ├── tasks-chart.tsx         # Gráficos de tarefas
│   │           │   ├── new-task-modal.tsx      # Modal de criação
│   │           │   ├── edit-task-modal.tsx     # Modal de edição
│   │           │   ├── task-row-actions.tsx     # Ações por linha
│   │           │   ├── user-menu.tsx           # Menu do usuário
│   │           │   ├── notification-dropdown.tsx
│   │           │   ├── theme-provider.tsx       # Provider de tema
│   │           │   └── index.ts                # Exportações
│   │           │
│   │           ├── tasks/
│   │           │   └── tasks-page-content.tsx
│   │           │
│   │           ├── reports/
│   │           │   ├── reports-content.tsx
│   │           │   └── index.ts
│   │           │
│   │           └── Tasks.tsx
│   │
│   ├── db/                                     # Configuração e schemas do banco
│   │   ├── index.ts                            # Exportações do módulo DB
│   │   └── schema/                             # Definições de tabelas (Drizzle)
│   │       ├── index.ts                        # Exportações de schemas
│   │       ├── users.ts                        # Schema: users
│   │       ├── tasks.ts                        # Schema: tasks
│   │       └── categories.ts                   # Schema: categories
│   │
│   ├── lib/                                    # Funções utilitárias e configurações
│   │   ├── auth.ts                             # Middleware de autenticação JWT
│   │   ├── db.ts                               # Instância do Drizzle ORM
│   │   └── utils.ts                            # Funções auxiliares (cn, etc)
│   │
│   ├── hooks/                                  # Custom React Hooks
│   │   ├── index.ts                            # Exportações
│   │   ├── use-auth.ts                         # Hook de autenticação
│   │   ├── use-tasks.ts                        # Hook de gerenciamento de tarefas
│   │   └── use-mobile.ts                       # Hook para detectar mobile
│   │
│   └── modules/                                # Camada de negócio (Backend)
│       ├── task.controller.ts                  # Controller de tarefas
│       ├── task.service.ts                     # Service de tarefas (regras de negócio)
│       └── task.repository.ts                  # Repository de tarefas (acesso ao DB)
│
├── public/                                     # Arquivos estáticos
│   ├── backgroung-login.png
│   └── *.svg                                   # Ícones e assets
│
├── drizzle/                                    # Migrations geradas (auto-criada)
│
├── docs/                                       # Documentação
│   ├── database-setup.md
│   ├── drizzle-setup.md
│   └── dashboard-components.md
│
├── scripts/
│   └── should-build.sh                         # Script de build automático
│
├── .env.local                                  # Variáveis de ambiente (local, gitignored)
├── env.production.example                      # Exemplo para produção
├── package.json                                # Dependências e scripts
├── tsconfig.json                               # Configuração TypeScript
├── next.config.ts                              # Configuração Next.js
├── drizzle.config.ts                           # Configuração Drizzle ORM
├── eslint.config.mjs                           # Configuração ESLint
├── postcss.config.mjs                          # Configuração PostCSS
├── components.json                             # Configuração Shadcn/ui
├── Dockerfile                                  # Containerização Docker
├── docker-compose.yml                          # Compose para desenvolvimento
├── docker-compose.prod.yml                     # Compose para produção
└── README.md                                   # Documentação geral
```

---

## 🗄️ Banco de Dados

### Configuração
- **Provedor**: Neon Database (PostgreSQL Serverless)
- **ORM**: Drizzle ORM (type-safe, queries tipadas)
- **Conexão**: HTTP via `@neondatabase/serverless`
- **Cache**: Habilitado (`neonConfig.fetchConnectionCache = true`)
- **Variável de Ambiente**: `DATABASE_URL`

### Schemas (Tabelas)

#### `users` (`src/db/schema/users.ts`)
```typescript
{
  id: uuid (PK, auto-gerado com defaultRandom())
  email: varchar[255] (unique, not null)
  name: varchar[255] (nullable)
  password: varchar[255] (hash bcrypt, nullable)
  createdAt: timestamp (default: now, not null)
  updatedAt: timestamp (default: now, not null)
  isActive: boolean (default: true, not null)
}
```
- **Tipos TypeScript**: `User`, `NewUser` (inferidos automaticamente)
- **Relacionamento**: Um usuário pode ter múltiplas tarefas (1:N)

#### `tasks` (`src/db/schema/tasks.ts`)
```typescript
{
  id: uuid (PK, auto-gerado)
  title: varchar[255] (not null)
  description: text (nullable)
  status: enum["pending", "in_progress", "completed", "cancelled"] (default: "pending")
  priority: enum["low", "medium", "high"] (default: "medium")
  userId: uuid (FK → users.id, cascade delete, not null)
  categoryId: uuid (FK → categories.id, set null on delete, not null)
  dueDate: timestamp (nullable)
  completedAt: timestamp (nullable)
  createdAt: timestamp (default: now, not null)
  updatedAt: timestamp (default: now, not null)
  isDeleted: boolean (default: false, soft delete)
}
```
- **Tipos TypeScript**: `Task`, `NewTask`
- **Relacionamentos**: 
  - Pertence a um usuário (`userId`)
  - Pertence a uma categoria (`categoryId`)

#### `categories` (`src/db/schema/categories.ts`)
```typescript
{
  id: uuid (PK, auto-gerado)
  name: varchar[255] (unique, not null)
  createdAt: timestamp (default: now, not null)
  updateAt: timestamp (default: now, not null)
}
```
- **Tipos TypeScript**: `Category`, `NewCategory`
- **Relacionamento**: Uma categoria pode ter múltiplas tarefas (1:N)

### Instância Drizzle (`src/lib/db.ts`)
```typescript
- Conexão via Neon HTTP
- Cache de conexões habilitado
- Validação de DATABASE_URL (erro se não definida)
- Exporta: db (instância Drizzle), sql (cliente SQL direto)
```

---

## 🔐 Sistema de Autenticação

### Middleware JWT (`src/lib/auth.ts`)
```typescript
authMiddleware(req: NextRequest): { userId: string | null; response?: NextResponse }
```
- **Validação**: Verifica header `Authorization: Bearer <token>`
- **Decodificação**: Usa `JWT_SECRET` para verificar token
- **Retorno**: `userId` extraído do payload ou erro 401
- **Segurança**: Trata tokens expirados, inválidos ou ausentes

### Fluxo de Autenticação

#### 1. Registro (`POST /api/auth/register`)
```
Request: { name, email, password }
↓
Valida campos obrigatórios
↓
Verifica email existente (SELECT users WHERE email)
↓
Hash da senha (bcryptjs, salt: 10)
↓
Insere novo usuário (INSERT users)
↓
Response: { user: { id, name, email, isActive } }
```

#### 2. Login (`POST /api/auth/sign`)
```
Request: { email, password }
↓
Valida email e senha
↓
Busca usuário por email (SELECT users WHERE email)
↓
Compara hash bcrypt (compare(password, user.password))
↓
Gera token JWT (payload: { userId, email }, expiresIn: "1d")
↓
Response: { success: true, user: {...}, token: "..." }
```

#### 3. Proteção de Rotas
```typescript
// Exemplo de uso em API Route
export async function GET(req: NextRequest) {
  const { userId, response } = authMiddleware(req);
  
  if (!userId) return response; // 401 Unauthorized
  
  // Lógica da rota autenticada...
  return NextResponse.json({ data });
}
```

### Segurança
- ✅ Senhas: Hash bcrypt com salt 10
- ✅ Tokens: Assinados com `JWT_SECRET`
- ✅ Headers: Validação obrigatória de `Authorization`
- ✅ Type-safe: TypeScript para payloads e respostas
- ⚠️ **Pendente**: Refresh tokens, expiração configurável

---

## 🚀 API Endpoints

### Autenticação
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/api/auth/register` | Criar novo usuário | ❌ Público |
| `POST` | `/api/auth/sign` | Login (retorna JWT) | ❌ Público |

### Perfil
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/api/profile` | Obter perfil do usuário | ✅ JWT |
| `PUT` | `/api/profile` | Atualizar perfil | ✅ JWT |

### Usuários
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/api/users` | Listar usuários | ✅ JWT (admin?) |
| `GET` | `/api/users/[id]` | Obter usuário específico | ✅ JWT |

### Tarefas
| Método | Endpoint | Descrição | Autenticação | Status |
|--------|----------|-----------|--------------|--------|
| `GET` | `/api/tasks` | Listar tarefas do usuário | ✅ JWT | ⚠️ Mock |
| `POST` | `/api/tasks` | Criar tarefa | ✅ JWT | ⚠️ Mock |
| `GET` | `/api/tasks/[id]` | Obter tarefa específica | ✅ JWT | ⚠️ Mock |
| `PATCH` | `/api/tasks/[id]` | Atualizar tarefa | ✅ JWT | ⚠️ Mock |
| `DELETE` | `/api/tasks/[id]` | Deletar tarefa | ✅ JWT | ⚠️ Mock |

**Nota**: As rotas de tarefas atualmente usam dados mockados em memória. A arquitetura Controller → Service → Repository está implementada, mas ainda não está integrada nas rotas da API.

### Utilitários
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/api/test-db` | Testar conexão com banco | ❌ Público |

---

## 🏛️ Arquitetura em Camadas (Backend)

### 1. Controller (`src/modules/task.controller.ts`)
**Responsabilidade**: Receber requisições HTTP, validar entrada, chamar services

```typescript
class TaskController {
  async create(req: Request)        // POST /api/tasks
  async getById(id: string)         // GET /api/tasks/[id]
  async listByUser(searchParams)    // GET /api/tasks
  async update(req: Request, id)     // PATCH /api/tasks/[id]
  async delete(id: string)          // DELETE /api/tasks/[id]
}
```

**Características**:
- Valida entrada HTTP
- Extrai parâmetros de rota e query
- Chama `TaskService`
- Retorna `NextResponse` com status apropriado
- Trata erros e retorna mensagens amigáveis

### 2. Service (`src/modules/task.service.ts`)
**Responsabilidade**: Regras de negócio, validações, orquestração

```typescript
class TaskService {
  async createTask(data: NewTask, userId: string): Promise<Task>
  async getTaskById(id: string, userId: string): Promise<Task>
  async listTasksByUser(userId: string, filters?): Promise<Task[]>
  async updateTask(id: string, userId: string, data: UpdateTaskData): Promise<Task>
  async deleteTask(id: string, userId: string): Promise<void>
}
```

**Regras de Negócio Implementadas**:
- ✅ Validação: Título mínimo de 3 caracteres
- ✅ Autorização: Usuário só pode criar/editar/deletar suas próprias tarefas
- ✅ Auto-atualização: Se `completedAt` é definido, `status` vira `completed`
- ✅ Validação de existência: Verifica se tarefa existe antes de operações

### 3. Repository (`src/modules/task.repository.ts`)
**Responsabilidade**: Abstrair acesso ao banco de dados via Drizzle ORM

```typescript
class TaskRepository {
  async create(data: NewTask): Promise<Task>
  async findByIdAndUser(id: string, userId: string): Promise<Task | undefined>
  async listByUser(userId: string, filters?): Promise<Task[]>
  async update(id: string, userId: string, data: UpdateTaskData): Promise<Task | undefined>
  async delete(id: string, userId: string): Promise<Task | undefined>
}
```

**Características**:
- Usa Drizzle ORM para queries type-safe
- Filtra por `userId` em todas as operações (segurança)
- Usa `and()`, `eq()`, `asc()` para queries complexas
- Retorna tipos TypeScript inferidos do schema

---

## 🎨 Frontend - Componentes e Hooks

### Custom Hooks

#### `useAuth()` (`src/hooks/use-auth.ts`)
```typescript
interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

const { user, loading, logout, navigateTo } = useAuth()
```
- **Funcionalidades**:
  - Busca perfil do usuário via `/api/profile`
  - Gerencia estado de autenticação
  - Função `logout()` que limpa estado e redireciona
  - Função `navigateTo()` para navegação programática

#### `useTasks()` (`src/hooks/use-tasks.ts`)
```typescript
interface Task {
  id: number
  title: string
  status: "completed" | "in_progress" | "pending"
  priority: "high" | "medium" | "low"
  dueDate: string
  description?: string
}

const { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask, searchTasks } = useTasks()
```
- **Funcionalidades**:
  - Gerencia estado de tarefas
  - CRUD completo (Create, Read, Update, Delete)
  - Busca/filtro de tarefas
  - Fallback para dados mockados se API falhar
  - Auto-fetch no mount

### Componentes do Dashboard

#### Estrutura Principal
- **`Sidebar`**: Menu lateral com navegação
- **`Header`**: Cabeçalho com user menu, notificações, tema
- **`MetricCards`**: Cards de métricas (total, pendentes, concluídas, etc)
- **`TasksList`**: Tabela/listagem de tarefas
- **`TasksChart`**: Gráficos de tarefas (Recharts)

#### Modais e Ações
- **`NewTaskModal`**: Modal para criar nova tarefa
- **`EditTaskModal`**: Modal para editar tarefa existente
- **`TaskRowActions`**: Ações por linha (editar, deletar)
- **`UserMenu`**: Menu dropdown do usuário
- **`NotificationDropdown`**: Dropdown de notificações

#### Providers
- **`ThemeProvider`**: Provider de tema (dark/light mode via next-themes)

### Componentes UI Base (`src/app/components/ui/`)
- **`Button`**: Botão reutilizável com variantes
- **`Card`**: Card container
- **`Input`**: Input de formulário
- **`Chart`**: Wrapper para gráficos
- **`Logo`**: Componente de logo
- **`Separator`**: Separador visual

---

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor dev (http://localhost:3000)

# Build e Produção
npm run build            # Build para produção
npm run start            # Inicia servidor de produção

# Linting
npm run lint             # Verifica erros ESLint

# Banco de Dados (Drizzle)
npm run db:generate      # Gera migration baseada em schema
npm run db:migrate       # Executa migrations pendentes
npm run db:push          # Sincroniza schema com BD (dev, sem migrations)
npm run db:studio        # Abre Drizzle Studio (UI para visualizar BD)
```

---

## 🔧 Configurações Principais

### `next.config.ts`
```typescript
- Redireciona "/" para "/auth/login" (permanent: false)
- Configuração padrão do Next.js 16
```

### `drizzle.config.ts`
```typescript
- Dialect: PostgreSQL
- Schema: ./src/db/schema/index.ts
- Migrations: ./drizzle/
- Credenciais: DATABASE_URL (env)
- Carrega .env.local automaticamente
```

### `tsconfig.json`
```typescript
- Target: ES6+
- Strict mode ativado
- Module resolution: bundler
- Path alias: @/* → raiz do projeto
- JSX: react-jsx
```

### Tailwind CSS v4
- Configuração via PostCSS
- Dark mode support
- Custom theme colors
- Responsive utilities

---

## 🌐 Variáveis de Ambiente

Criar arquivo `.env.local`:
```env
# Banco de Dados (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Autenticação JWT
JWT_SECRET=sua-chave-secreta-muito-segura-aqui

# URLs (opcional)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Importante**: 
- `.env.local` está no `.gitignore` (não versionado)
- Usar `env.production.example` como referência para produção

---

## 🐳 Docker

### `Dockerfile`
- Imagem base: Node.js
- Multi-stage build
- Otimizado para produção

### `docker-compose.yml` (Desenvolvimento)
- Serviço Next.js
- Portas e volumes configurados
- Hot reload habilitado

### `docker-compose.prod.yml` (Produção)
- Otimizações para produção
- Build otimizado
- Configuração de restart

---

## 📊 Features Implementadas

### ✅ Backend
- [x] Autenticação JWT (register, login, middleware)
- [x] Hash bcrypt de senhas
- [x] Arquitetura em camadas (Controller → Service → Repository)
- [x] Drizzle ORM com schemas type-safe
- [x] Migrations automáticas
- [x] Validações de negócio
- [x] Soft delete para tarefas
- [x] Relacionamentos (users → tasks → categories)

### ✅ Frontend
- [x] Next.js App Router
- [x] Componentes reutilizáveis (UI base)
- [x] Dashboard completo
- [x] Dark/Light mode
- [x] Responsive design
- [x] Custom hooks (useAuth, useTasks)
- [x] Gráficos com Recharts
- [x] Modais para CRUD de tarefas

### ⚠️ Em Desenvolvimento / Pendente
- [ ] Integração completa das rotas de tarefas com Controller/Service/Repository
- [ ] Refresh tokens
- [ ] Validação de email
- [ ] Recuperação de senha
- [ ] Testes unitários/integração
- [ ] CI/CD (GitHub Actions)
- [ ] Rate limiting
- [ ] Logging estruturado
- [ ] Documentação OpenAPI/Swagger
- [ ] Monitoring e alertas

---

## 🔄 Workflow de Desenvolvimento

### 1. Criar novo Schema
```bash
# 1. Editar src/db/schema/*.ts
# 2. Gerar migration
npm run db:generate

# 3. Aplicar no banco (dev)
npm run db:push

# Ou aplicar migration (produção)
npm run db:migrate
```

### 2. Usar Drizzle nas APIs
```typescript
import { db } from '@/lib/db';
import { users, tasks } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// SELECT
const user = await db
  .select()
  .from(users)
  .where(eq(users.id, id))
  .limit(1);

// INSERT
const [newTask] = await db
  .insert(tasks)
  .values({ title, userId, categoryId })
  .returning();

// UPDATE
await db
  .update(tasks)
  .set({ status: 'completed' })
  .where(and(eq(tasks.id, id), eq(tasks.userId, userId)));

// DELETE
await db
  .delete(tasks)
  .where(and(eq(tasks.id, id), eq(tasks.userId, userId)));
```

### 3. Proteger Rotas
```typescript
import { authMiddleware } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { userId, response } = authMiddleware(req);
  
  if (!userId) return response; // 401 Unauthorized
  
  // Lógica da rota autenticada...
  return NextResponse.json({ data });
}
```

### 4. Usar Arquitetura em Camadas
```typescript
// Em uma API Route (ex: src/app/api/tasks/route.ts)
import { TaskController } from '@/modules/task.controller';
import { authMiddleware } from '@/lib/auth';

const controller = new TaskController();

export async function POST(req: NextRequest) {
  const { userId, response } = authMiddleware(req);
  if (!userId) return response;
  
  return await controller.create(req);
}
```

---

## 📝 Convenções de Código

### Estrutura
- Componentes em `PascalCase` (ex: `TaskList.tsx`)
- Arquivos em `lowercase` (ex: `task.service.ts`)
- Pastas com nomes descritivos
- Path aliases com `@/` (ex: `@/lib/db`)

### TypeScript
- Strict mode ativado
- Sempre tipifique variáveis e funções
- Use tipos inferidos do Drizzle (`typeof tasks.$inferSelect`)
- Evite `any`, use `unknown` quando necessário

### Imports
- Organize por tipo (React, Next, DB, lib, components)
- Use path aliases `@/`
- Agrupe imports relacionados

### Naming
- Funções: `camelCase` ou `verbAction` (ex: `createTask`, `fetchUser`)
- Constantes: `UPPER_SNAKE_CASE` (ex: `JWT_SECRET`)
- Variáveis: `camelCase` (ex: `userId`, `taskList`)
- Tipos/Interfaces: `PascalCase` (ex: `User`, `Task`, `NewTask`)

---

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- npm/pnpm/yarn
- Conta no Neon Database (ou PostgreSQL local)

### Setup Inicial
```bash
# 1. Clonar repositório
git clone <repo>
cd app-taskeasy

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp env.production.example .env.local
# Preencher DATABASE_URL e JWT_SECRET

# 4. Sincronizar schema com banco (dev)
npm run db:push

# 5. Iniciar desenvolvimento
npm run dev

# 6. Acessar
# http://localhost:3000 → redireciona para /auth/login
```

---

## 🔍 Troubleshooting

### Erro: "DATABASE_URL não está definida"
- Verificar se `.env.local` existe
- Verificar se `DATABASE_URL` está preenchido
- Verificar formato da URL: `postgresql://user:password@host/database?sslmode=require`

### Erro: "Token inválido ou expirado"
- Verificar se `JWT_SECRET` está configurado
- Verificar se o token não está expirado (expira em 1 dia)
- Fazer login novamente

### Erro: "Email já registrado"
- Verificar se o email já existe no banco
- Usar email diferente ou fazer login

### Migrations falhando
- Executar `npm run db:generate` para criar migration
- Verificar schema em `src/db/schema/`
- Executar `npm run db:push` ou `npm run db:migrate`
- Verificar logs do Drizzle Studio: `npm run db:studio`

### Componentes não renderizando
- Verificar se está usando `"use client"` em componentes client-side
- Verificar imports de componentes
- Verificar se Tailwind está configurado corretamente

---

## 📌 Próximas Etapas Recomendadas

### Prioridade Alta
1. **Integrar Controller/Service/Repository nas rotas de tarefas** (substituir mocks)
2. **Implementar refresh tokens** para melhor segurança
3. **Adicionar validação de email** no registro
4. **Implementar recuperação de senha** (forgot-password)

### Prioridade Média
5. **Adicionar testes unitários/integração** (Jest, Vitest)
6. **Configurar CI/CD** (GitHub Actions)
7. **Implementar rate limiting** nas APIs
8. **Adicionar logging estruturado** (Winston, Pino)

### Prioridade Baixa
9. **Documentar endpoints com OpenAPI/Swagger**
10. **Setup de monitoring e alertas** (Sentry, DataDog)
11. **Otimizações de performance** (cache, lazy loading)
12. **Deploy em produção** (Vercel, Railway, etc)

---

## 🔗 Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Neon Database Documentation](https://neon.tech/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [React 19 Documentation](https://react.dev)

---

**Última atualização**: 26 de Novembro de 2025  
**Branch Atual**: criacao-dashboard  
**Repositório**: appeasytaskmanager/app-taskeasy
