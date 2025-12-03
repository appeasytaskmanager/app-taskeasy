import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { TaskService } from "./task.service";
import { NewTask } from "../../db/schema/tasks";
import { authMiddleware } from "@/lib/auth";

const taskService = new TaskService();

export class TaskController {
  /**
   * POST /api/tasks
   * Cria nova tarefa
   */
  async create(req: Request) {
    const authResult = authMiddleware(req as NextRequest);

    if (authResult.response) {
      return authResult.response; // erro 401 unauthorized
    }

    const userId = authResult.userId as string; // userId é garantido

    try {
      const body = await req.json();
      const { title, description, status, priority, dueDate, categoryId } =
        body;

      // Validação básica
      if (!title || !title.trim()) {
        return NextResponse.json(
          { error: "Título da tarefa é obrigatório." },
          { status: 400 }
        );
      }

      if (!categoryId) {
        return NextResponse.json(
          { error: "Categoria é obrigatória." },
          { status: 400 }
        );
      }

      // Prepara dados para criação
      const taskData: NewTask = {
        title: title.trim(),
        description: description || null,
        status: status || "pending",
        priority: priority || "medium",
        userId: userId,
        categoryId: categoryId,
        dueDate: dueDate ? new Date(dueDate) : null,
        isDeleted: false, // Garante que a tarefa não seja marcada como deletada
      };

      // Chama o service
      const newTask = await taskService.createTask(taskData, userId);

      // Revalida o cache das páginas que exibem tarefas
      revalidatePath("/dashboard");
      revalidatePath("/tasks");
      revalidatePath("/reports");

      return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
      // Lida com erros do service (validações/regras de negócio)
      if (error instanceof Error) {
        // Erros de validação (400)
        if (
          error.message.includes("obrigatório") ||
          error.message.includes("mínimo")
        ) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
        // Outros erros
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json(
        { error: "Erro ao criar tarefa." },
        { status: 500 }
      );
    }
  }

  async getById(req: Request, id: string) {
    // GET /api/tasks/[id] -> busca pelo ID
    // o ID seria passado como parâmetro da rota Next.js (params)

    const authResult = authMiddleware(req as NextRequest);

    if (authResult.response) {
      return authResult.response;
    }

    const userId = authResult.userId as string;

    try {
      const task = await taskService.getTaskById(id, userId);
      return NextResponse.json(task, { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (
          error.message.includes("não encontrada") ||
          error.message.includes("negado")
        ) {
          return NextResponse.json({ error: error.message }, { status: 404 });
        }
      }
    }
    return NextResponse.json(
      { error: "erro interno do servidor." },
      { status: 500 }
    );
  }

  /**
   * GET /api/tasks
   * Lista tarefas do usuário
   */
  async listByUser(req: Request, searchParams: URLSearchParams) {
    const authResult = authMiddleware(req as NextRequest);

    if (authResult.response) {
      return authResult.response; // Retorna 401 Unauthorized
    }

    const userId = authResult.userId as string;

    try {
      // Transforma os parâmetros de URL em um objeto de filtro simples
      const filters = Object.fromEntries(searchParams.entries());

      // Chama o service
      const tasks = await taskService.listTasksByUser(userId, filters);

      if (tasks.length === 0) {
        return NextResponse.json(
          {
            message: "Nenhuma tarefa encontrada com esses filtros",
            tasks: [],
          },
          { status: 200 }
        );
      }

      return NextResponse.json(tasks, { status: 200 });
    } catch (error: unknown) {
      console.error("Erro ao listar tarefas:", error);
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message || "Erro ao listar tarefas." },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: "Erro ao listar tarefas." },
        { status: 500 }
      );
    }
  }

  async update(req: Request, id: string) {
    // PUT/PATCH /api/tasks/[id] -> atualização

    const authResult = authMiddleware(req as NextRequest);

    if (authResult.response) {
      return authResult.response; // 401 Unauthorize
    }

    const userId = authResult.userId as string;

    const body = await req.json();
    const { title, description, status, priority, dueDate, categoryId } = body;

    // Prepara dados para atualização (somente campos enviados)
    const updateData: Record<string, any> = {};

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description || null;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (dueDate !== undefined) {
      // Converte string para Date se necessário
      updateData.dueDate = dueDate ? new Date(dueDate) : null;
    }

    try {
      const updatedTask = await taskService.updateTask(id, userId, updateData);

      // Revalida o cache das páginas que exibem tarefas
      revalidatePath("/dashboard");
      revalidatePath("/tasks");
      revalidatePath("/reports");

      return NextResponse.json(updatedTask, { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const status = error.message.includes("atualizar") ? 404 : 400;

        return NextResponse.json({ error: error.message }, { status });
      }
    }
  }

  async delete(req: Request, id: string) {
    // delete -> /api/tasks/[id] (deletar)

    const authResult = authMiddleware(req as NextRequest);

    if (authResult.response) {
      return authResult.response; // 401 ou unauthorized
    }

    const userId = authResult.userId as string;

    try {
      await taskService.deleteTask(id, userId);

      // Revalida o cache das páginas que exibem tarefas
      revalidatePath("/dashboard");
      revalidatePath("/tasks");
      revalidatePath("/reports");

      return new Response(null, { status: 204 }); //204 = sucesso sem conteúdo
    } catch (error: unknown) {
      if (error instanceof Error) {
        //retorna acesso negado ou não encontrado
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
    }
  }
}
