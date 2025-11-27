# 🚀 Guia Rápido - Dashboard Components

## Início Rápido

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
```bash
# Copiar exemplo
cp .env.production.example .env.local

# Preenchimento mínimo
DATABASE_URL=postgresql://user:password@host/db
JWT_SECRET=sua-chave-secreta
```

### 3. Iniciar Desenvolvimento
```bash
npm run dev
```

### 4. Acessar Dashboard
```
http://localhost:3000/dashboard
```

---

## 📦 Usar Componentes UI

### Button
```tsx
import { Button } from "@/components/ui/button"

// Variantes
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Icon
<Button size="icon"><Plus /></Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo aqui
  </CardContent>
</Card>
```

### Input
```tsx
import { Input } from "@/components/ui/input"

<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Senha" />
```

---

## 🎨 Usar Componentes Dashboard

### Layout Completo
```tsx
import {
  Sidebar,
  Header,
  MetricCards,
  TasksChart,
  TasksList,
} from "@/components/view/dashboard"

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

### Componente Individual
```tsx
import { MetricCards } from "@/components/view/dashboard"

export default function StatsPage() {
  return (
    <div>
      <MetricCards />
    </div>
  )
}
```

---

## 🎣 Usar Custom Hooks

### useMobile
```tsx
import { useMobile } from "@/hooks"

export default function MyComponent() {
  const isMobile = useMobile()
  
  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  )
}
```

---

## 🌓 Tema Light/Dark

### Tema Automático
O projeto usa `next-themes` e detecta automaticamente a preferência do usuário.

### Mudar Tema Manualmente
```tsx
"use client"

import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Alternar Tema
    </button>
  )
}
```

### Classes Dark Mode
```tsx
// Tailwind detecta automaticamente
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Conteúdo adaptativo
</div>
```

---

## 📊 Gráficos

### Usar Recharts
```tsx
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  visitors: { label: "Visitantes", color: "hsl(220, 90%, 56%)" },
}

const data = [
  { date: "Jan", visitors: 100 },
  { date: "Feb", visitors: 120 },
]

export function MyChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="visitors" stroke="#0ea5e9" fill="#e0f2fe" />
      </AreaChart>
    </ChartContainer>
  )
}
```

---

## 🎯 Conectar com API

### Exemplo: Carregar Tarefas Reais

1. **Criar página com dados dinâmicos**
```tsx
import { TasksList } from "@/components/view/dashboard"

export default function TasksPage() {
  return <TasksList />
}
```

2. **Modificar TasksList para aceitar props**
```tsx
interface Task {
  id: string
  title: string
  status: "pending" | "in_progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string
}

export function TasksList({ tasks }: { tasks: Task[] }) {
  // Renderizar tasks dinâmicas
  return (
    <table>
      {/* ... */}
    </table>
  )
}
```

3. **Chamar API no layout**
```tsx
"use client"

import { useEffect, useState } from "react"
import { TasksList } from "@/components/view/dashboard"

export default function DashboardPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => {
        setTasks(data)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <div>Carregando...</div>
  
  return <TasksList tasks={tasks} />
}
```

---

## 🔧 Customizar Componentes

### Estender Button
```tsx
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CustomButton(props) {
  return (
    <Button
      className={cn("rounded-full", props.className)}
      {...props}
    />
  )
}
```

### Estender Card
```tsx
import { Card } from "@/components/ui/card"

export function MyCard(props) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow" {...props} />
  )
}
```

---

## 🎨 Classe Utility cn()

A função `cn()` do utils permite merge inteligente de classes Tailwind:

```tsx
import { cn } from "@/lib/utils"

// Evita conflitos de classes
const className = cn(
  "p-4 bg-blue-500",      // base
  "bg-red-500",           // sobrescreve bg-blue
  isActive && "border-2",
  customClassName
)
```

---

## 📱 Responsividade

### Breakpoints Tailwind
- `sm`: 640px
- `md`: 768px (mobile threshold usado no useMobile)
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Uso
```tsx
<div className="
  grid
  grid-cols-1      sm:grid-cols-2
  md:grid-cols-3   lg:grid-cols-4
  p-4 md:p-6 lg:p-8
">
  {/* Content */}
</div>
```

---

## 🐛 Troubleshooting

### Erro: "useChart must be used within a <ChartContainer />"
```tsx
// ❌ Errado
import { ChartTooltip } from "@/components/ui/chart"
<ChartTooltip /> // Fora de ChartContainer

// ✅ Correto
<ChartContainer config={config}>
  <AreaChart>
    <ChartTooltip content={<ChartTooltipContent />} />
  </AreaChart>
</ChartContainer>
```

### Erro: "Hydration mismatch"
```tsx
// Adicione suppressHydrationWarning no html
<html suppressHydrationWarning>
```

### Tema não muda
```tsx
// Certifique-se de que ThemeProvider está no layout
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

### Gráfico não mostra
```tsx
// ChartContainer precisa de altura definida
<ChartContainer config={config} className="h-[300px]">
  {/* ... */}
</ChartContainer>
```

---

## 📚 Referências

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Recharts Docs](https://recharts.org)
- [Radix UI Docs](https://radix-ui.com)
- [next-themes Docs](https://github.com/pacocoursey/next-themes)

---

## 💡 Dicas

1. **Use a função `cn()`** para merge de classes
2. **Sempre tipifique** com TypeScript
3. **Use componentes UI** ao invés de inline styles
4. **Teste responsividade** com DevTools
5. **Prefira `dark:` classes** para dark mode
6. **Reutilize componentes** ao máximo
7. **Mantenha props simples** em componentes

---

## 🎬 Próximos Passos

1. [Dashboard Components Guide](./docs/dashboard-components.md) - Documentação completa
2. [Database Setup](./docs/database-setup.md) - Configurar banco de dados
3. [Drizzle ORM Guide](./docs/drizzle-setup.md) - Usar ORM

---

**Precisa de ajuda?** Consulte a documentação em `/docs`
