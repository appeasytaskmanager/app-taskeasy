# 🧪 Guia de Teste Local

## ✅ Status do Servidor

O servidor de desenvolvimento está **RODANDO** na porta 3000.

## 🌐 Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

A aplicação deve redirecionar automaticamente para:
```
http://localhost:3000/auth/login
```

## ⚙️ Configuração Necessária

### 1. Arquivo `.env.local`

Crie um arquivo `.env.local` na raiz do projeto com:

```env
# Banco de Dados (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Autenticação JWT
JWT_SECRET=dev-secret-key-change-in-production-min-32-chars

# URL da API (opcional)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**IMPORTANTE**: 
- Substitua `DATABASE_URL` pela sua URL real do Neon Database
- Use uma chave `JWT_SECRET` forte em produção

### 2. Banco de Dados

Se ainda não configurou o banco:
1. Acesse https://console.neon.tech
2. Crie um projeto
3. Copie a connection string
4. Cole no `.env.local`

## 🧪 Testes a Realizar

### 1. Teste de Página Inicial
- [ ] Acessar http://localhost:3000
- [ ] Verificar redirecionamento para `/auth/login`
- [ ] Verificar se a página de login carrega corretamente

### 2. Teste de Registro
- [ ] Preencher formulário de registro
- [ ] Verificar validação de campos
- [ ] Verificar se email já existe
- [ ] Criar novo usuário
- [ ] Verificar redirecionamento para dashboard após registro

### 3. Teste de Login
- [ ] Preencher email e senha
- [ ] Fazer login
- [ ] Verificar redirecionamento para dashboard
- [ ] Verificar se dados do usuário aparecem no menu

### 4. Teste de Dashboard
- [ ] Verificar se dashboard carrega
- [ ] Verificar se dados do usuário aparecem
- [ ] Verificar sidebar e navegação
- [ ] Verificar cards de métricas

### 5. Teste de Proteção de Rotas
- [ ] Tentar acessar `/dashboard` sem estar logado
- [ ] Verificar redirecionamento para login
- [ ] Fazer login e verificar acesso

### 6. Teste de Logout
- [ ] Clicar em "Sair" no menu do usuário
- [ ] Verificar limpeza de token
- [ ] Verificar redirecionamento para login

### 7. Teste de Requisições
- [ ] Verificar se token é adicionado automaticamente
- [ ] Verificar se requisições autenticadas funcionam
- [ ] Verificar tratamento de erro 401

## 🐛 Possíveis Problemas

### Erro: "DATABASE_URL não está definida"
**Solução**: Crie o arquivo `.env.local` com a variável `DATABASE_URL`

### Erro: "Token inválido ou expirado"
**Solução**: Faça login novamente

### Erro: "Cannot connect to database"
**Solução**: 
1. Verifique se a `DATABASE_URL` está correta
2. Verifique se o banco Neon está ativo
3. Execute `npm run db:push` para sincronizar schema

### Página não carrega
**Solução**:
1. Verifique se o servidor está rodando: `netstat -ano | findstr :3000`
2. Verifique o console do terminal para erros
3. Limpe o cache: `rm -rf .next` e reinicie

### Erro de compilação
**Solução**:
1. Verifique o console do terminal
2. Verifique se todas as dependências estão instaladas: `npm install`
3. Verifique erros de TypeScript

## 📊 Checklist de Funcionalidades

### Autenticação
- [x] Registro de usuário
- [x] Login com JWT
- [x] Logout
- [x] Proteção de rotas
- [x] Persistência de token

### Frontend
- [x] Página de login
- [x] Página de registro
- [x] Dashboard
- [x] Sidebar com navegação
- [x] Header com busca
- [x] Menu do usuário

### Backend
- [x] API de registro
- [x] API de login
- [x] API de perfil
- [x] Middleware de autenticação
- [x] Validação de dados

## 🚀 Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Verificar se porta 3000 está em uso
netstat -ano | findstr :3000

# Parar servidor (Ctrl+C no terminal)

# Ver logs do servidor
# (aparecem no terminal onde rodou npm run dev)
```

## 📝 Notas

- O servidor está rodando em **background**
- Acesse http://localhost:3000 no navegador
- Verifique o console do navegador (F12) para erros
- Verifique o terminal onde o servidor está rodando para logs

---

**Status**: ✅ Servidor rodando na porta 3000
**Próximo passo**: Abra http://localhost:3000 no navegador


