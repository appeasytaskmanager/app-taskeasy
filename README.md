# 📚 Documentação do Projeto

Bem-vindo à documentação do **EasyTask Manager App**. Esta documentação fornece guias completos para configurar, desenvolver e manter o projeto.

## 📑 Índice da Documentação

### 🎨 UI e Componentes

- **[Dashboard Components](./docs/dashboard-components.md)**
  - Componentes UI base (Button, Card, Input, Chart)
  - Componentes do Dashboard (Sidebar, Header, Charts, Lists)
  - Custom Hooks (useMobile)
  - Padrões e boas práticas
  - Exemplos de uso
  - Temas e estilos (light/dark mode)

### 🗄️ Banco de Dados

- **[Configuração do Neon Database](./docs//database-setup.md)**
  - Como configurar a conexão com o Neon PostgreSQL
  - Configuração de variáveis de ambiente
  - Testar conexão
  - Comandos úteis do Neon
  - Segurança e boas práticas
  - Troubleshooting

### 🚀 ORM e Queries

- **[Guia do Drizzle ORM](./docs/drizzle-setup.md)**
  - Estrutura do projeto
  - Definição de schemas
  - Comandos do Drizzle
  - Queries e operações CRUD
  - Tipos TypeScript
  - Workflow de desenvolvimento
  - Exemplos práticos
  - Boas práticas
  - Troubleshooting

## 🚀 Início Rápido

### 1. Configurar Ambiente

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.production.example .env.local
# Preencher DATABASE_URL e JWT_SECRET
```

### 2. Visualizar Dashboard

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Abrir http://localhost:3000/dashboard
```

### 3. Configurar Banco de Dados

Siga o guia [Configuração do Neon Database](./docs/database-setup.md) para:

- Criar conta no Neon Database
- Obter URL de conexão
- Configurar variáveis de ambiente
- Testar conexão

### 4. Usar Drizzle ORM

Siga o guia [Guia do Drizzle ORM](./docs/drizzle-setup.md) para:

- Entender a estrutura do projeto
- Criar schemas
- Gerar e aplicar migrations
- Usar o Drizzle nas APIs

## 📖 Guias por Tarefa

### Configuração Inicial

1. **[Configuração do Neon Database](./docs/database-setup.md#1-obter-url-de-conexão)**

   - Obter URL de conexão
   - Configurar variáveis de ambiente

2. **[Guia do Drizzle ORM](./docs/drizzle-setup.md#1-estrutura-do-projeto)**
   - Estrutura do projeto
   - Criar schemas

### Desenvolvimento

1. **[Criar Schemas](./docs/drizzle-setup.md#2-schemas)**

   - Definir tabelas
   - Criar relações
   - Usar tipos de dados

2. **[Gerar Migrations](./docs/drizzle-setup.md#3-comandos-do-drizzle)**

   - Gerar migrations
   - Aplicar migrations
   - Push direto (desenvolvimento)

3. **[Usar o Drizzle ORM](./docs/drizzle-setup.md#4-usar-o-drizzle-orm)**
   - Operações CRUD
   - Queries com filtros
   - Queries com relações
   - Queries avançadas

4. **[Construir UI com Componentes](./docs/dashboard-components.md)**
   - Usar componentes UI base
   - Criar páginas com Dashboard components
   - Implementar custom hooks
   - Trabalhar com temas

### Produção

1. **[Segurança](./docs/database-setup.md#6-segurança)**

   - Boas práticas de segurança
   - Rotação de senhas
   - Checklist de segurança

2. **[Migrations em Produção](./docs/drizzle-setup.md#3-comandos-do-drizzle)**
   - Gerar migrations
   - Aplicar migrations
   - Backup antes de migrations

## 🔍 Navegação Rápida

### Por Tópico

| Tópico                | Documento                                     | Seção                                                                               |
| --------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------- |
| Configurar banco      | [database-setup.md](./docs/database-setup.md) | [Obter URL de Conexão](./docs/database-setup.md#1-obter-url-de-conexão)             |
| Variáveis de ambiente | [database-setup.md](./docs/database-setup.md) | [Configurar Variáveis](./docs/database-setup.md#2-configurar-variáveis-de-ambiente) |
| Testar conexão        | [database-setup.md](./docs/database-setup.md) | [Testar Conexão](./docs/database-setup.md#3-testar-conexão)                         |
| Criar schemas         | [drizzle-setup.md](./docs/drizzle-setup.md)   | [Schemas](./docs/drizzle-setup.md#2-schemas)                                        |
| Gerar migrations      | [drizzle-setup.md](./docs/drizzle-setup.md)   | [Comandos do Drizzle](./docs/drizzle-setup.md#3-comandos-do-drizzle)                |
| Operações CRUD        | [drizzle-setup.md](./docs/drizzle-setup.md)   | [Usar o Drizzle ORM](./docs/drizzle-setup.md#4-usar-o-drizzle-orm)                  |
| Queries com relações  | [drizzle-setup.md](./docs/drizzle-setup.md)   | [Queries com Relações](./docs/drizzle-setup.md#4-usar-o-drizzle-orm)                |
| Troubleshooting       | [database-setup.md](./docs/database-setup.md) | [Troubleshooting](./docs/database-setup.md#7-troubleshooting)                       |
| Boas práticas         | [drizzle-setup.md](./docs/drizzle-setup.md)   | [Boas Práticas](./docs/drizzle-setup.md#8-boas-práticas)                            |

### Por Comando

| Comando                         | Documento                                     | Descrição               |
| ------------------------------- | --------------------------------------------- | ----------------------- |
| `npm run db:generate`           | [drizzle-setup.md](./docs/drizzle-setup.md)   | Gerar migrations        |
| `npm run db:migrate`            | [drizzle-setup.md](./docs/drizzle-setup.md)   | Aplicar migrations      |
| `npm run db:push`               | [drizzle-setup.md](./docs/drizzle-setup.md)   | Push direto (dev)       |
| `npm run db:studio`             | [drizzle-setup.md](./docs/drizzle-setup.md)   | Abrir Drizzle Studio    |
| `npx neonctl connection-string` | [database-setup.md](./docs/database-setup.md) | Obter connection string |

## 📝 Estrutura dos Documentos

Todos os documentos seguem uma estrutura consistente:

1. **Índice** - Navegação rápida
2. **Visão Geral** - Introdução e contexto
3. **Pré-requisitos** - O que é necessário
4. **Conteúdo Principal** - Passo a passo detalhado
5. **Exemplos** - Código e exemplos práticos
6. **Troubleshooting** - Solução de problemas
7. **Recursos Adicionais** - Links e referências

## 🆘 Precisa de Ajuda?

### Problemas Comuns

- **Erro de conexão?** → Veja [Troubleshooting - Database](./docs/database-setup.md#7-troubleshooting)
- **Erro de migration?** → Veja [Troubleshooting - Drizzle](./docs/drizzle-setup.md#9-troubleshooting)
- **Problemas de tipo?** → Veja [Tipos TypeScript](./docs/drizzle-setup.md#5-tipos-typescript)

### Recursos Adicionais

- [Documentação do Neon](https://neon.tech/docs)
- [Documentação do Drizzle](https://orm.drizzle.team/)
- [Documentação do Next.js](https://nextjs.org/docs)

## 🔄 Atualizações

Esta documentação é mantida atualizada com as últimas versões das ferramentas. Se encontrar algo desatualizado ou tiver sugestões, por favor abra uma issue no repositório.

---

**💡 Dica:** Use o índice no início de cada documento para navegação rápida.

## 🚀 Como Começar

- Fazer o git clone do repositório
- Mudar para a branch develop para ver o projeto em desenvolvimento
