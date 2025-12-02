import { NextRequest, NextResponse } from "next/server";

interface Task {
  id: number;
  title: string;
  status: "completed" | "in_progress" | "pending";
  priority: "high" | "medium" | "low";
  dueDate: string;
  description?: string;
}

// Armazenamento em memória (durante esta sessão)
const tasksStore: Task[] = [
  {
    id: 1,
    title: "Implementar dashboard",
    status: "in_progress",
    priority: "high",
    dueDate: "2025-11-30",
    description: "Criar interface da dashboard",
  },
  {
    id: 2,
    title: "Revisar código",
    status: "pending",
    priority: "medium",
    dueDate: "2025-12-01",
    description: "Revisar o código do projeto",
  },
  {
    id: 3,
    title: "Testes unitários",
    status: "completed",
    priority: "high",
    dueDate: "2025-11-28",
    description: "Fazer testes unitários",
  },
  {
    id: 4,
    title: "Documentação",
    status: "pending",
    priority: "low",
    dueDate: "2025-12-05",
    description: "Documentar o projeto",
  },
];

export async function GET() {
  try {
    return NextResponse.json(tasksStore, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar tarefas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newTask: Task = {
      id: Date.now(),
      ...(body as Omit<Task, "id">),
    };

    tasksStore.push(newTask);

    return NextResponse.json(newTask, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar tarefa" },
      { status: 500 }
    );
  }
}
