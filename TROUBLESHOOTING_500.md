# 🔧 Troubleshooting - Erro 500 no Cadastro

## ✅ Melhorias Implementadas

O tratamento de erros foi melhorado para identificar e exibir mensagens mais específicas sobre o problema.

## 🔍 Possíveis Causas do Erro 500

### 1. **DATABASE_URL não configurada**
**Sintoma**: Erro ao iniciar a aplicação ou ao fazer requisições

**Solução**:
```bash
# 1. Crie o arquivo .env.local na raiz do projeto
# 2. Adicione:
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=sua-chave-secreta-aqui
```

### 2. **Tabelas não criadas (Schema não sincronizado)**
**Sintoma**: Erro mencionando "relation" ou "does not exist"

**Solução**:
```bash
# Sincronizar schema com o banco
npm run db:push

# Ou aplicar migrations
npm run db:generate
npm run db:migrate
```

### 3. **Banco de dados não acessível**
**Sintoma**: Erro de conexão ou timeout

**Solução**:
- Verifique se a URL do banco está correta
- Verifique se o banco Neon está ativo
- Verifique sua conexão com a internet
- Teste a conexão: `npm run db:studio`

### 4. **Problema com o schema do banco**
**Sintoma**: Erro ao inserir dados

**Solução**:
```bash
# Verifique o schema em src/db/schema/users.ts
# Execute novamente:
npm run db:push
```

## 🧪 Como Diagnosticar

### 1. Verificar Logs do Servidor
No terminal onde o `npm run dev` está rodando, procure por:
- `Erro ao cadastrar usuário:`
- Mensagens de erro específicas

### 2. Verificar Variáveis de Ambiente
```bash
# No terminal (PowerShell)
Get-Content .env.local
```

### 3. Testar Conexão com Banco
```bash
npm run db:studio
# Deve abrir o Drizzle Studio se a conexão estiver OK
```

### 4. Verificar no DevTools
1. Abra F12 → Network
2. Tente cadastrar novamente
3. Clique na requisição `register`
4. Veja a Response para mensagem de erro específica

## 📝 Mensagens de Erro Específicas

Agora o sistema retorna mensagens mais específicas:

- **"Erro de configuração: DATABASE_URL não está definida."**
  → Configure a variável de ambiente

- **"Erro de conexão com o banco de dados. Verifique se o banco está acessível."**
  → Verifique a URL do banco e conexão

- **"Erro de configuração: Tabela não encontrada. Execute 'npm run db:push' para criar as tabelas."**
  → Execute `npm run db:push`

- **"Erro interno do servidor. Tente novamente mais tarde."**
  → Verifique os logs do servidor para mais detalhes

## 🚀 Passos para Resolver

### Passo 1: Verificar .env.local
```bash
# Certifique-se de que existe e tem:
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

### Passo 2: Sincronizar Schema
```bash
npm run db:push
```

### Passo 3: Verificar Logs
- Olhe o terminal do servidor
- Procure por mensagens de erro específicas

### Passo 4: Testar Conexão
```bash
npm run db:studio
```

### Passo 5: Verificar Response no DevTools
- Abra F12 → Network
- Veja a mensagem de erro específica na Response

## 💡 Dica

Se o erro persistir, verifique:
1. ✅ Arquivo `.env.local` existe e está correto
2. ✅ `DATABASE_URL` está configurada corretamente
3. ✅ Schema foi sincronizado (`npm run db:push`)
4. ✅ Banco Neon está ativo e acessível
5. ✅ Logs do servidor para detalhes específicos

---

**Próximo passo**: Verifique os logs do servidor e a mensagem de erro específica retornada na Response do DevTools.

