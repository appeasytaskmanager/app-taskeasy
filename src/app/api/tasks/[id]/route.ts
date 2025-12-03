import { NextRequest } from "next/server";
import { TaskController } from "@/modules/tasks/task.controller";

const taskController = new TaskController();

/**
 * GET /api/tasks/:id
 * Busca uma tarefa específica por ID
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return taskController.getById(request, id);
}

/**
 * PUT /api/tasks/:id
 * Atualiza uma tarefa específica
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return taskController.update(request, id);
}

/**
 * PATCH /api/tasks/:id
 * Atualiza uma tarefa específica (parcialmente)
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return taskController.update(request, id);
}

/**
 * DELETE /api/tasks/:id
 * Deleta uma tarefa específica
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return taskController.delete(request, id);
}
