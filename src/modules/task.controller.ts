import { NextResponse } from "next/server";
import { TaskService } from "./task.service";
import { NewTask } from '../db/schema/tasks';
import next from "next";
import { mock } from "node:test";

const taskService = new TaskService();

const MOCK_USER_ID = ''; //Ver como vai ficar essa parte

export class TaskControlleer {
    //post = /api/tasks (create)

    async create (req: Request){
        try {
            const data: NewTask = await req.json();
            const userId = MOCK_USER_ID; //aqui é a lógica de autenticação

            //formata os dados e chama o service
            const newTask = await taskService.createTask({...data, userId }, userId);

            return NextResponse.json(newTask, { status: 201 });
        } catch (error) {
            //lida com erros no service validações/regras de negócio
            if (error instanceof Error) {
                return NextResponse.json({ error: error.message }, { status: 400});
            }
            return NextResponse.json({ error: "Unknown error" }, { status: 400});
        }
    }

    async getById(id: string) {
        // GET /api/tasks/[id] -> busca pelo ID
        // o ID seria passado como parâmetro da rota Next.js (params)
        const userId = MOCK_USER_ID;

        try {
            const task = await taskService.getTaskById(id, userId);
            return NextResponse.json(task, { status: 200 });

        } catch(error: unknown) {
            if (error instanceof Error){
                if (error.message.includes("não encontrada") || error.message.includes("negado")) {
                    return NextResponse.json({error: error.message}, {status: 404});
                }
            }
        }
        return NextResponse.json({ error: "erro interno do servidor."}, {status: 500});
    }

    async listByUser (searchParams: URLSearchParams) {
        //GET /api/tasks (Listagem)
        //Nota: os filtros vão variar conforme os parametros de busca (searchParams)
        const userId = MOCK_USER_ID;

        //transforma os paramtetros de URL em um objeto de filtro simples

        const filters = Object.fromEntries(searchParams.entries());

        try { 
            const tasks = await taskService.listTasksByUser(userId, filters);
            return NextResponse.json(tasks, {status: 200});
        } catch (error: unknown) {
            if (error instanceof Error) {
                return NextResponse.json({ error: "Erro ao listar tarefas."}, {status: 500});
            }
        }
    }

    async update (req: Request, id: string) {
        // PUT/PATCH /api/tasks/[id] -> atualização 
        const userId = MOCK_USER_ID;
        const data = await req.json();

        try {
            const updateTask = await taskService.updateTask(id, userId, data);

            return NextResponse.json(updateTask, { status: 500});

        } catch (error: unknown) {
            if (error instanceof Error) { 
                const status = error.message.includes("atualizar") ? 404 : 400;

                return NextResponse.json({error: error.message }, { status });
            }
        }
    }

    async delete(id: string) {
        // delete -> /api/tasks/[id] (deletar)
        const userId = MOCK_USER_ID;

        try {
            await taskService.deleteTask(id, userId);

            return new Response(null, { status: 204 }); //204 = sucesso sem conteúdo 
        } catch (error: unknown) {
            if (error instanceof Error) {
                //retorna acesso negado ou não encontrado
                return NextResponse.json({error: error.message}, {status: 404});
            }
        }
    }
}