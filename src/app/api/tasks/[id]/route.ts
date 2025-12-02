import { NextRequest, NextResponse } from "next/server";

interface Task {
  id: number;
  title: string;
  status: "completed" | "in_progress" | "pending";
  priority: "high" | "medium" | "low";
  dueDate: string;
  description?: string;
}

// Referência para acesso ao store (isso seria um banco de dados em produção)
// Para este exemplo, usamos a referência do arquivo principal
let taskStore: Task[] = [];

// Função auxiliar para obter o store (seria substituída por uma query ao BD)
function getTaskStore(): Task[] {
  if (taskStore.length === 0) {
    taskStore = [
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
  }
  return taskStore;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const store = getTaskStore();
    const task = store.find((t) => t.id === id);

    if (!task) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(task, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar tarefa" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const updates = await request.json();
    const store = getTaskStore();
    const taskIndex = store.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );
    }

    const updatedTask = { ...store[taskIndex], ...updates };
    store[taskIndex] = updatedTask;

    return NextResponse.json(updatedTask, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar tarefa" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const store = getTaskStore();
    const taskIndex = store.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );
    }

    store.splice(taskIndex, 1);

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao deletar tarefa" },
      { status: 500 }
    );
  }
}
