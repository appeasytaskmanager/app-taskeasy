import { NextRequest } from "next/server";
import { TaskControlleer } from "@/modules/tasks/task.controller";

const taskController = new TaskControlleer();

// Listar tasks do usuário

export async function GET(req: NextRequest, context: { params: { id: string }}) {

    const params = await context.params;
    const id = params.id;

    console.log("ROUTE PARAMS RECEIVED:", params);

    return taskController.getById(req, id);
}

// PUT: /api/tasks/[id] -> Atualizar task
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

    const { id } = await context.params;

    console.log("PARAMS RECEBIDO:", id); // <<< TESTAR

    return taskController.update(req, id);
}

// DELETE: /api/tasks/[id] -> Deletar Task 
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

    const { id } = await context.params

    return taskController.delete(req, id);
}