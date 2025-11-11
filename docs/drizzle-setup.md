# 🚀 Guia do Drizzle ORM

> Guia completo para usar o Drizzle ORM no projeto com Neon PostgreSQL

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Estrutura do Projeto](#1-estrutura-do-projeto)
- [Schemas](#2-schemas)
- [Comandos do Drizzle](#3-comandos-do-drizzle)
- [Usar o Drizzle ORM](#4-usar-o-drizzle-orm)
- [Tipos TypeScript](#5-tipos-typescript)
- [Workflow de Desenvolvimento](#6-workflow-de-desenvolvimento)
- [Exemplos Práticos](#7-exemplos-práticos)
- [Boas Práticas](#8-boas-práticas)
- [Troubleshooting](#9-troubleshooting)
- [Recursos Adicionais](#10-recursos-adicionais)

## Visão Geral

O **Drizzle ORM** é um ORM TypeScript moderno, leve e type-safe para PostgreSQL. Ele oferece:

- ✅ **Type-Safety**: Tipos TypeScript inferidos automaticamente
- ✅ **Performance**: Queries otimizadas e minimal overhead
- ✅ **Developer Experience**: API intuitiva e expressiva
- ✅ **Migrations**: Sistema de migrations robusto
- ✅ **SQL-like Syntax**: Sintaxe familiar para desenvolvedores SQL

Este projeto está configurado com Drizzle ORM integrado ao Neon PostgreSQL. Para configurar a conexão com o banco, consulte o [Guia de Configuração do Neon Database](./database-setup.md).

## Pré-requisitos

- [x] Neon Database configurado (veja [database-setup.md](./database-setup.md))
- [x] Variável `DATABASE_URL` configurada
- [x] Node.js 18+ instalado
- [x] Dependências instaladas (`npm install`)

## 1. Estrutura do Projeto

### Organização de Arquivos

```
src/
  db/
    schema/
      index.ts      # Exporta todos os schemas
      users.ts      # Schema de usuários
      tasks.ts      # Schema de tarefas
    index.ts        # Exporta db e schemas
  lib/
    db.ts           # Configuração do Drizzle com Neon
  app/
    api/
      users/
        route.ts    # API routes usando Drizzle
```

### Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| `src/lib/db.ts` | Configuração da conexão com o banco e instância do Drizzle |
| `src/db/schema/` | Definições dos schemas das tabelas |
| `src/db/index.ts` | Exportações centralizadas |
| `drizzle.config.ts` | Configuração do Drizzle Kit |

## 2. Schemas

### O que são Schemas?

Schemas são definições TypeScript que descrevem a estrutura das tabelas do banco de dados. Eles são usados para:

- Gerar migrations automaticamente
- Inferir tipos TypeScript
- Validar dados em tempo de compilação
- Documentar a estrutura do banco

### Estrutura de um Schema

Os schemas estão definidos em `src/db/schema/`. Cada arquivo define uma tabela do banco de dados.

### Exemplo: Schema de Usuários

```typescript
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

// Tipos TypeScript inferidos automaticamente
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

### Exemplo: Schema de Tarefas (com Relação)

```typescript
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./users";

// Enum para status da tarefa
export const taskStatusEnum = pgEnum("task_status", [
  "pending",
  "in_progress",
  "completed",
  "cancelled",
]);

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: taskStatusEnum("status").default("pending").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
```

### Tipos de Dados Disponíveis

| Tipo Drizzle | PostgreSQL | Descrição |
|--------------|------------|-----------|
| `uuid()` | UUID | Identificador único universal |
| `varchar(n)` | VARCHAR(n) | String com tamanho máximo |
| `text()` | TEXT | String de tamanho ilimitado |
| `integer()` | INTEGER | Número inteiro |
| `bigint()` | BIGINT | Número inteiro grande |
| `boolean()` | BOOLEAN | Valor booleano |
| `timestamp()` | TIMESTAMP | Data e hora |
| `date()` | DATE | Data |
| `decimal()` | DECIMAL | Número decimal |
| `json()` | JSON | Dados JSON |

### Relações entre Tabelas

```typescript
// Foreign Key (Chave Estrangeira)
userId: uuid("user_id")
  .notNull()
  .references(() => users.id, { onDelete: "cascade" })

// Opções de onDelete:
// - "cascade": Deleta registros relacionados
// - "restrict": Impede deleção se houver registros relacionados
// - "setNull": Define como null
// - "setDefault": Define como valor padrão
```

## 3. Comandos do Drizzle

### Gerar Migrations

```bash
npm run db:generate
```

**O que faz:**
- Analisa os schemas em `src/db/schema/`
- Gera arquivos de migração na pasta `drizzle/`
- Cria SQL para criar/alterar tabelas

**Quando usar:**
- Após modificar schemas
- Antes de fazer deploy
- Para versionar mudanças no banco

### Aplicar Migrations

```bash
npm run db:migrate
```

**O que faz:**
- Executa as migrations pendentes no banco de dados
- Atualiza o schema do banco
- Registra as migrations aplicadas

**Quando usar:**
- Após gerar migrations
- Em ambientes de produção
- Para sincronizar schemas entre ambientes

### Push Direto (Desenvolvimento)

```bash
npm run db:push
```

**O que faz:**
- Sincroniza o schema diretamente com o banco
- Não cria arquivos de migração
- Útil para desenvolvimento rápido

**Quando usar:**
- Durante desenvolvimento
- Para testes rápidos
- **NÃO usar em produção**

### Abrir Drizzle Studio

```bash
npm run db:studio
```

**O que faz:**
- Abre uma interface web em `http://localhost:4983`
- Permite visualizar e editar dados
- Útil para testes e debugging

**Recursos:**
- Visualizar tabelas e dados
- Executar queries
- Editar dados diretamente
- Explorar relacionamentos

### Comparação de Comandos

| Comando | Quando Usar | Cria Migrations | Aplica no Banco |
|---------|-------------|-----------------|-----------------|
| `db:generate` | Após modificar schemas | ✅ Sim | ❌ Não |
| `db:migrate` | Após gerar migrations | ❌ Não | ✅ Sim |
| `db:push` | Desenvolvimento rápido | ❌ Não | ✅ Sim |
| `db:studio` | Visualizar dados | ❌ Não | ❌ Não |

## 4. Usar o Drizzle ORM

### Importar o Banco de Dados

```typescript
import { db } from "@/lib/db";
import { users, tasks } from "@/db/schema";
import { eq, and, or, like, desc, asc } from "drizzle-orm";
```

### Operações Básicas (CRUD)

#### Create (Criar)

```typescript
// Criar um usuário
const newUser = await db
  .insert(users)
  .values({
    email: "user@example.com",
    name: "John Doe",
    password: "hashed_password",
  })
  .returning();

// Criar múltiplos usuários
const newUsers = await db
  .insert(users)
  .values([
    { email: "user1@example.com", name: "User 1" },
    { email: "user2@example.com", name: "User 2" },
  ])
  .returning();
```

#### Read (Ler)

```typescript
// Listar todos os usuários
const allUsers = await db.select().from(users);

// Buscar usuário por ID
const user = await db
  .select()
  .from(users)
  .where(eq(users.id, userId))
  .limit(1);

// Buscar usuário por email
const userByEmail = await db
  .select()
  .from(users)
  .where(eq(users.email, "user@example.com"))
  .limit(1);

// Buscar usuários ativos
const activeUsers = await db
  .select()
  .from(users)
  .where(eq(users.isActive, true));
```

#### Update (Atualizar)

```typescript
// Atualizar usuário
const updatedUser = await db
  .update(users)
  .set({
    name: "Jane Doe",
    updatedAt: new Date(),
  })
  .where(eq(users.id, userId))
  .returning();

// Atualizar múltiplos registros
await db
  .update(users)
  .set({ isActive: false })
  .where(eq(users.createdAt, "<", someDate));
```

#### Delete (Deletar)

```typescript
// Deletar usuário
await db.delete(users).where(eq(users.id, userId));

// Deletar múltiplos registros
await db
  .delete(users)
  .where(eq(users.isActive, false));
```

### Queries com Filtros

#### Operadores de Comparação

```typescript
import { eq, ne, gt, gte, lt, lte, like, ilike } from "drizzle-orm";

// Igual
.where(eq(users.id, userId))

// Diferente
.where(ne(users.status, "deleted"))

// Maior que
.where(gt(users.createdAt, someDate))

// Maior ou igual
.where(gte(users.age, 18))

// Menor que
.where(lt(users.createdAt, someDate))

// Menor ou igual
.where(lte(users.age, 65))

// Like (case-sensitive)
.where(like(users.name, "%John%"))

// ILike (case-insensitive)
.where(ilike(users.email, "%example.com%"))
```

#### Operadores Lógicos

```typescript
import { and, or, not } from "drizzle-orm";

// AND (e)
.where(
  and(
    eq(users.isActive, true),
    eq(users.email, "user@example.com")
  )
)

// OR (ou)
.where(
  or(
    eq(users.status, "active"),
    eq(users.status, "pending")
  )
)

// NOT (não)
.where(not(eq(users.isDeleted, true)))
```

#### Ordenação

```typescript
import { desc, asc } from "drizzle-orm";

// Ordenar por data de criação (mais recente primeiro)
const users = await db
  .select()
  .from(users)
  .orderBy(desc(users.createdAt));

// Ordenar por múltiplas colunas
const tasks = await db
  .select()
  .from(tasks)
  .orderBy(asc(tasks.status), desc(tasks.createdAt));
```

#### Limitação e Paginação

```typescript
// Limitar resultados
const users = await db
  .select()
  .from(users)
  .limit(10);

// Paginação
const page = 1;
const pageSize = 10;
const offset = (page - 1) * pageSize;

const users = await db
  .select()
  .from(users)
  .limit(pageSize)
  .offset(offset);
```

### Queries com Relações (Joins)

#### Inner Join

```typescript
import { db } from "@/lib/db";
import { tasks, users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Buscar tarefas com informações do usuário
const tasksWithUsers = await db
  .select({
    task: tasks,
    user: users,
  })
  .from(tasks)
  .innerJoin(users, eq(tasks.userId, users.id));
```

#### Left Join

```typescript
// Buscar usuários com suas tarefas (mesmo sem tarefas)
const usersWithTasks = await db
  .select({
    user: users,
    task: tasks,
  })
  .from(users)
  .leftJoin(tasks, eq(users.id, tasks.userId));
```

#### Seleção Específica

```typescript
// Selecionar apenas campos específicos
const tasksWithUserNames = await db
  .select({
    taskId: tasks.id,
    taskTitle: tasks.title,
    userName: users.name,
    userEmail: users.email,
  })
  .from(tasks)
  .innerJoin(users, eq(tasks.userId, users.id));
```

### Queries Avançadas

#### Agregações

```typescript
import { count, sum, avg, max, min } from "drizzle-orm";

// Contar usuários
const userCount = await db
  .select({ count: count() })
  .from(users);

// Contar tarefas por usuário
const tasksPerUser = await db
  .select({
    userId: tasks.userId,
    count: count(tasks.id),
  })
  .from(tasks)
  .groupBy(tasks.userId);
```

#### Subqueries

```typescript
// Buscar usuários com contagem de tarefas
const usersWithTaskCount = await db
  .select({
    user: users,
    taskCount: sql<number>`(
      SELECT COUNT(*) 
      FROM ${tasks} 
      WHERE ${tasks.userId} = ${users.id}
    )`,
  })
  .from(users);
```

## 5. Tipos TypeScript

### Tipos Inferidos

O Drizzle gera tipos TypeScript automaticamente a partir dos schemas:

```typescript
import { User, NewUser } from "@/db/schema/users";
import { Task, NewTask } from "@/db/schema/tasks";

// Tipo para seleção (leitura)
const user: User = {
  id: "uuid",
  email: "user@example.com",
  name: "John Doe",
  password: "hashed_password",
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
};

// Tipo para inserção (criação)
const newUser: NewUser = {
  email: "user@example.com",
  name: "John Doe",
  // Campos opcionais podem ser omitidos
  // Campos com default não precisam ser fornecidos
};
```

### Tipos de Query

```typescript
// Tipo inferido de uma query
const users = await db.select().from(users);
// users: User[]

// Tipo inferido de uma query com join
const tasksWithUsers = await db
  .select({
    task: tasks,
    user: users,
  })
  .from(tasks)
  .innerJoin(users, eq(tasks.userId, users.id));
// tasksWithUsers: { task: Task; user: User }[]
```

## 6. Workflow de Desenvolvimento

### Fluxo Completo

1. **Definir Schema**
   - Crie ou edite schemas em `src/db/schema/`
   - Defina campos, tipos e relações

2. **Gerar Migration**
   - Execute `npm run db:generate`
   - Revise os arquivos de migração gerados

3. **Aplicar Migration**
   - Execute `npm run db:push` (desenvolvimento)
   - Ou `npm run db:migrate` (produção)

4. **Desenvolver**
   - Use `db` em suas APIs e componentes
   - Aproveite a type-safety do TypeScript

5. **Visualizar Dados**
   - Use `npm run db:studio` para ver os dados
   - Teste queries e valide resultados

### Exemplo de Workflow

```bash
# 1. Modificar schema
# Editar src/db/schema/users.ts

# 2. Gerar migration
npm run db:generate

# 3. Aplicar migration (desenvolvimento)
npm run db:push

# 4. Visualizar dados
npm run db:studio

# 5. Desenvolver
# Usar db em suas APIs
```

## 7. Exemplos Práticos

### Em API Routes

#### GET - Listar Recursos

```typescript
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json({ success: true, data: allUsers });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
```

#### GET - Buscar por ID

```typescript
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, params.id))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { success: false, message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao buscar usuário" },
      { status: 500 }
    );
  }
}
```

#### POST - Criar Recurso

```typescript
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email é obrigatório" },
        { status: 400 }
      );
    }

    const newUser = await db
      .insert(users)
      .values({
        email,
        name,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: newUser[0] },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}
```

#### PUT - Atualizar Recurso

```typescript
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, email } = body;

    const updatedUser = await db
      .update(users)
      .set({
        name,
        email,
        updatedAt: new Date(),
      })
      .where(eq(users.id, params.id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json(
        { success: false, message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedUser[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}
```

#### DELETE - Deletar Recurso

```typescript
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, params.id))
      .returning();

    if (deletedUser.length === 0) {
      return NextResponse.json(
        { success: false, message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Usuário deletado com sucesso",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}
```

### Em Server Components

```typescript
import { db } from "@/lib/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function TasksPage({
  params,
}: {
  params: { userId: string };
}) {
  const userTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, params.userId));

  return (
    <div>
      <h1>Tarefas</h1>
      {userTasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <span>Status: {task.status}</span>
        </div>
      ))}
    </div>
  );
}
```

### Exemplos de API Routes no Projeto

O projeto inclui exemplos de API routes:

- `src/app/api/test-db/route.ts` - Testar conexão
- `src/app/api/users/route.ts` - CRUD de usuários
- `src/app/api/users/[id]/route.ts` - Operações específicas de usuário

## 8. Boas Práticas

### Schemas

- ✅ Use tipos apropriados para cada campo
- ✅ Defina valores padrão quando apropriado
- ✅ Use constraints (unique, notNull) para validar dados
- ✅ Documente schemas complexos com comentários
- ✅ Exporte tipos TypeScript (`$inferSelect`, `$inferInsert`)

### Queries

- ✅ Use `.returning()` após insert/update para obter dados
- ✅ Sempre use `.where()` em updates e deletes
- ✅ Use paginação para listagens grandes
- ✅ Adicione índices para campos frequentemente consultados
- ✅ Use transações para operações múltiplas relacionadas

### Performance

- ✅ Use seleção específica de campos quando possível
- ✅ Evite selecionar todos os campos (`SELECT *`)
- ✅ Use joins apropriados (inner vs left)
- ✅ Adicione índices para campos de busca frequente
- ✅ Use connection pooling em produção

### Segurança

- ✅ Sempre valide dados de entrada
- ✅ Use prepared statements (Drizzle faz isso automaticamente)
- ✅ Não exponha senhas ou dados sensíveis
- ✅ Use soft delete quando apropriado
- ✅ Valide permissões antes de operações

### Migrations

- ✅ Use `db:push` apenas em desenvolvimento
- ✅ Use `db:generate` e `db:migrate` em produção
- ✅ Revise migrations antes de aplicar
- ✅ Faça backup antes de aplicar migrations em produção
- ✅ Teste migrations em ambiente de staging primeiro

## 9. Troubleshooting

### Erro: "Table does not exist"

**Causa:** Tabela não foi criada no banco de dados.

**Solução:**
```bash
npm run db:push
```

### Erro: "Column does not exist"

**Causa:** Coluna não existe no banco ou schema está desatualizado.

**Solução:**
1. Verifique se o schema está correto
2. Execute `npm run db:push` para sincronizar
3. Ou gere migration: `npm run db:generate` e `npm run db:migrate`

### Erro: "Foreign key constraint violation"

**Causa:** Tentativa de deletar ou atualizar registro referenciado por outra tabela.

**Solução:**
- Verifique as relações no schema
- Use `onDelete: "cascade"` se apropriado
- Ou delete os registros relacionados primeiro

### Erro: "Type error" no TypeScript

**Causa:** Tipos não estão sendo inferidos corretamente.

**Solução:**
- Verifique se os schemas estão exportados corretamente
- Use tipos inferidos: `typeof table.$inferSelect`
- Reinicie o TypeScript server no editor

### Performance Lenta

**Causa:** Queries não otimizadas ou falta de índices.

**Solução:**
- Adicione índices para campos frequentemente consultados
- Use seleção específica de campos
- Otimize joins e filtros
- Use paginação para listagens grandes

## 10. Recursos Adicionais

### Documentação Oficial

- [Documentação do Drizzle](https://orm.drizzle.team/) - Documentação completa
- [Drizzle com PostgreSQL](https://orm.drizzle.team/docs/get-started-postgresql) - Guia de início
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) - Documentação do Kit
- [Drizzle com Next.js](https://orm.drizzle.team/docs/tutorials/drizzle-with-nextjs) - Tutorial Next.js

### Documentação do Projeto

- [Guia de Configuração do Neon Database](./database-setup.md) - Configuração do banco
- [README.md](../README.md) - Visão geral do projeto

### Comunidade

- [Discord do Drizzle](https://discord.gg/8Yb3k25x8d) - Comunidade e suporte
- [GitHub do Drizzle](https://github.com/drizzle-team/drizzle-orm) - Código fonte
- [Twitter do Drizzle](https://twitter.com/drizzle_orm) - Atualizações

### Ferramentas Úteis

- [Drizzle Studio](https://orm.drizzle.team/kit-docs/studio) - Interface visual
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) - Ferramentas de migração
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação

---

**📝 Nota:** Este documento é específico para o Drizzle ORM. Para informações sobre a configuração do Neon Database, consulte o [Guia de Configuração do Neon Database](./database-setup.md).
