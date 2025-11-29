# Dashboard Components Documentation

## 📋 Visão Geral

Este documento descreve a implementação dos componentes do dashboard no projeto **app-taskeasy**, baseado nos componentes do projeto **dashboard copia** e seguindo o padrão estabelecido do projeto.

---

## 🏗️ Estrutura de Componentes

### Diretórios Criados

```
src/
├── components/
│   ├── ui/                          # Componentes UI base (Shadcn/ui style)
│   │   ├── button.tsx               # Botões com variantes
│   │   ├── card.tsx                 # Cards de conteúdo
│   │   ├── input.tsx                # Inputs de formulário
│   │   ├── chart.tsx                # Contexto e container de gráficos
│   │   ├── separator.tsx            # Separadores/divisores
│   │   └── index.ts                 # Exportações
│   └── view/
│       ├── dashboard/               # Componentes específicos do dashboard
│       │   ├── sidebar.tsx          # Barra lateral de navegação
│       │   ├── header.tsx           # Cabeçalho superior
│       │   ├── metric-cards.tsx     # Cards de métricas (KPIs)
│       │   ├── tasks-chart.tsx      # Gráfico de atividades
│       │   ├── tasks-list.tsx       # Tabela de tarefas
│       │   ├── theme-provider.tsx   # Provedor de temas
│       │   └── index.ts             # Exportações
│       └── index.ts
└── hooks/
    ├── use-mobile.ts                # Hook para detecção de mobile
    └── index.ts
```

---

## 🎨 Componentes UI Base

### Button (`src/components/ui/button.tsx`)
- **Variantes**: default, destructive, outline, secondary, ghost, link
- **Sizes**: default, sm, lg, icon
- **Features**: 
  - Suporte a `asChild` para composição com Slot
  - Acessibilidade integrada
  - Estados disabled

**Uso**:
```tsx
import { Button } from "@/components/ui/button"

<Button variant="default" size="sm">Click me</Button>
<Button variant="outline">Outline</Button>
```

### Card (`src/components/ui/card.tsx`)
- **Componentes**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Features**:
  - Estrutura semântica
  - Temas light/dark automáticos
  - Shadowing e borders consistentes

**Uso**:
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>
```

### Input (`src/components/ui/input.tsx`)
- **Features**:
  - Placeholder e variantes de tipo
  - Focus states customizados
  - Temas dark/light

**Uso**:
```tsx
import { Input } from "@/components/ui/input"

<Input type="email" placeholder="Email" />
```

### Chart (`src/components/ui/chart.tsx`)
- **Componentes**: ChartContainer, ChartTooltip, ChartTooltipContent
- **Features**:
  - Context API para compartilhar config
  - Suporte a Recharts
  - Tooltips customizados

**Uso**:
```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

<ChartContainer config={chartConfig}>
  <AreaChart data={data}>
    <ChartTooltip content={<ChartTooltipContent />} />
    {/* ... */}
  </AreaChart>
</ChartContainer>
```

### Separator (`src/components/ui/separator.tsx`)
- **Features**:
  - Orientação: horizontal/vertical
  - Acessibilidade com Radix UI

---

## 🎯 Componentes Dashboard

### Sidebar (`src/components/view/dashboard/sidebar.tsx`)
- **Features**:
  - Navegação responsiva (mobile toggle)
  - Logo e menu principal
  - Seção de documentos
  - Configurações e logout
  - Estados ativo/inativo

**Props**: Nenhuma (standalone)

**Exemplo**:
```tsx
import { Sidebar } from "@/components/view/dashboard"

<Sidebar />
```

### Header (`src/components/view/dashboard/header.tsx`)
- **Features**:
  - Barra de pesquisa
  - Botões de notificação e perfil
  - Botão "Nova Tarefa"
  - Responsivo para mobile

**Exemplo**:
```tsx
import { Header } from "@/components/view/dashboard"

<Header />
```

### MetricCards (`src/components/view/dashboard/metric-cards.tsx`)
- **Features**:
  - Grid responsivo (1, 2 ou 4 colunas)
  - Cards com trending indicators
  - Dados mockados (atualizáveis)

**Dados**:
- Tarefas Concluídas
- Tarefas Pendentes
- Em Progresso
- Taxa de Conclusão

**Exemplo**:
```tsx
import { MetricCards } from "@/components/view/dashboard"

<MetricCards />
```

### TasksChart (`src/components/view/dashboard/tasks-chart.tsx`)
- **Features**:
  - Gráfico de área com 2 séries
  - Dados dos últimos 7 dias
  - Botões de filtro de período
  - Gradientes e animações
  - Cores: azul (tarefas totais) e verde (concluídas)

**Exemplo**:
```tsx
import { TasksChart } from "@/components/view/dashboard"

<TasksChart />
```

### TasksList (`src/components/view/dashboard/tasks-list.tsx`)
- **Features**:
  - Tabela com scroll horizontal
  - Status badges (Concluída, Em Progresso, Pendente)
  - Indicadores de prioridade
  - Datas de vencimento
  - Responsivo

**Colunas**:
- Tarefa (título)
- Status (badge colorida)
- Prioridade (alta/média/baixa)
- Vencimento (data formatada)

**Exemplo**:
```tsx
import { TasksList } from "@/components/view/dashboard"

<TasksList />
```

### ThemeProvider (`src/components/view/dashboard/theme-provider.tsx`)
- **Features**:
  - Suporte a temas light/dark
  - Usa next-themes
  - Configurável no layout

**Exemplo**:
```tsx
import { ThemeProvider } from "@/components/view/dashboard"

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

---

## 🎣 Custom Hooks

### useMobile (`src/hooks/use-mobile.ts`)
- **Breakpoint**: 768px (md)
- **Features**:
  - Detecção de viewport mobile
  - Event listener otimizado
  - SSR-safe

**Uso**:
```tsx
import { useMobile } from "@/hooks"

const isMobile = useMobile()

return isMobile ? <MobileView /> : <DesktopView />
```

---

## 🏠 Página Dashboard Completa

### `src/app/(pages)/dashboard/page.tsx`

**Layout**:
```
┌─────────────────────────────────────┐
│         SIDEBAR    │      HEADER      │
├────────────────────┼─────────────────┤
│                    │ METRIC CARDS    │
│   NAVEGAÇÃO        │ (4 colunas)     │
│                    ├─────────────────┤
│                    │ CHART  │ RESUMO │
│                    │        │        │
│                    │        │ PRAZOS │
│                    ├────────┴────────┤
│                    │   TASKS TABLE   │
│                    └─────────────────┘
```

**Componentes utilizados**:
- Sidebar
- Header
- MetricCards
- TasksChart
- TasksList
- Resumo de produtividade (inline)
- Próximos prazos (inline)

---

## 🎨 Temas e Estilos

### Sistema de Cores
- **Light Mode**: Backgrounds claros, texto escuro
- **Dark Mode**: Backgrounds escuros, texto claro
- **Paleta Principal**: Azul (primary), Verde (success), Vermelho (destructive)

### Classe Tailwind
- Usando Tailwind CSS v4 com `@import "tailwindcss"`
- Variáveis CSS para temas
- Suporte completo a dark mode

### Responsividade
- **Mobile**: < 768px (sidebar toggle, layout em coluna)
- **Tablet**: 768px - 1024px (layout adaptável)
- **Desktop**: > 1024px (layout completo)

---

## 📦 Dependências Adicionadas

```json
{
  "dependencies": {
    "recharts": "^2.10.0",
    "next-themes": "^0.4.6",
    "@radix-ui/react-dropdown-menu": "^2.x",
    "@radix-ui/react-separator": "^1.x"
  }
}
```

---

## 🔧 Padrões e Boas Práticas

### 1. **Organização de Componentes**
```
- UI Components: Primitivas reutilizáveis (button, card, input)
- View Components: Componentes de página/seção
- Hooks: Lógica reutilizável
- Lib: Funções utilitárias
```

### 2. **Nomenclatura**
- Arquivos: `kebab-case` (.tsx)
- Componentes: `PascalCase`
- Props: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`

### 3. **Tipagem**
- Sempre use TypeScript
- Props interface para componentes
- Use tipos inferidos quando possível

### 4. **Imports**
```tsx
// Ordem recomendada:
import React from "react"           // React/Next
import { Button } from "@/components/ui"  // Components
import { cn } from "@/lib/utils"    // Utils
```

### 5. **CSS Classes**
```tsx
// Usar cn() do utils para merge de classes
import { cn } from "@/lib/utils"

className={cn(
  "base-classes",
  variant && "variant-classes",
  className
)}
```

---

## 📊 Dados Mockados

Todos os componentes usam dados mockados para demonstração:

### MetricCards
```tsx
const metrics = [
  { title: "Tarefas Concluídas", value: "24", change: "+12.5%", trend: "up" },
  // ...
]
```

### TasksChart
```tsx
const chartData = [
  { date: "Seg", tarefas: 4, concluídas: 2 },
  // ...
]
```

### TasksList
```tsx
const recentTasks = [
  { id: 1, title: "...", status: "...", priority: "..." },
  // ...
]
```

---

## 🚀 Próximos Passos

1. **Conectar com API**
   - Substituir dados mockados por chamadas API
   - Usar React Query ou SWR para cache

2. **Implementar Funcionalidades**
   - Criar nova tarefa (modal)
   - Editar tarefa
   - Deletar tarefa
   - Filtrar tarefas

3. **Adicionar Autenticação**
   - Proteger rota do dashboard
   - Exibir dados do usuário logado

4. **Testes**
   - Testes unitários (Jest)
   - Testes de integração (React Testing Library)

5. **Performance**
   - Lazy loading de componentes
   - Memoização com React.memo
   - Otimização de imagens

---

## 📝 Exemplos de Uso

### Layout Completo
```tsx
import { Sidebar, Header, MetricCards, TasksChart, TasksList } from "@/components/view/dashboard"

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <MetricCards />
          <TasksChart />
          <TasksList />
        </main>
      </div>
    </div>
  )
}
```

### Com Dados Dinâmicos
```tsx
import { useEffect, useState } from "react"
import { TasksList } from "@/components/view/dashboard"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    // Fetch from API
    fetch("/api/tasks").then(res => setTasks(res.json()))
  }, [])
  
  return <TasksList tasks={tasks} />
}
```

---

## 🐛 Troubleshooting

### Problema: Gráfico não mostra
**Solução**: Certifique-se de que ChartContainer tem uma altura definida
```tsx
<ChartContainer config={config} className="h-[300px]">
  {/* ... */}
</ChartContainer>
```

### Problema: Dark mode não funciona
**Solução**: Adicione `suppressHydrationWarning` no html
```tsx
<html suppressHydrationWarning>
```

### Problema: Sidebar não fecha no mobile
**Solução**: Use o hook `useMobile()` ou toque fora (overlay)

---

**Última atualização**: 26 de Novembro de 2025
**Versão**: 1.0.0
