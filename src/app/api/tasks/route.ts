import { NextRequest } from "next/server";
import { TaskController } from "../../../modules/tasks/task.controller";

const taskController = new TaskController();

/**
 * POST /api/tasks
 * Cria uma nova tarefa para o usuário autenticado
 */
export async function POST(request: NextRequest) {
  return taskController.create(request);
}

/**
 * GET /api/tasks
 * Lista tarefas do usuário autenticado com filtros opcionais
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return taskController.listByUser(request, searchParams);
}
