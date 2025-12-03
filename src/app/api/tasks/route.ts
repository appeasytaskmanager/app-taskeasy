import { NextRequest } from "next/server";
import { TaskControlleer } from '../../../modules/task.controller';

const taskController = new TaskControlleer();

// POST: /api/tasks (Create)

export async function POST(request: NextRequest) {
    return taskController.create(request);
}

//GET /api/tasks (listagem com filtros)

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url); // extrai os parametros da URL 

    //o controller espera o objeto da request e o params

    return taskController.listByUser(searchParams);
}