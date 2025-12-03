import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/auth";
import { TaskController } from "@/modules/task.controller";

const taskController = new TaskController();

/**
 * GET /api/tasks
 * Lista tarefas do usuário autenticado
 */
export async function GET(req: NextRequest) {
  try {
    // Verifica autenticação
    const { userId, response } = authMiddleware(req);
    
    if (response || !userId) {
      return response || NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    // Obtém parâmetros de busca
    const searchParams = req.nextUrl.searchParams;
    
    // Chama o controller com userId
    return await taskController.listByUser(searchParams, userId);
  } catch (error: any) {
    console.error("Erro ao listar tarefas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * Cria nova tarefa para o usuário autenticado
 */
export async function POST(req: NextRequest) {
  try {
    // Verifica autenticação
    const { userId, response } = authMiddleware(req);
    
    if (response || !userId) {
      return response || NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    // Chama o controller (que usa o userId do authMiddleware)
    return await taskController.create(req, userId);
  } catch (error: any) {
    console.error("Erro ao criar tarefa:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
