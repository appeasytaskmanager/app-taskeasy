import { NextResponse } from "next/server";
import { TaskService } from "./task.service";
import { NewTask } from '../db/schema/tasks';
import { URLSearchParams } from "url";

const taskService = new TaskService();

export class TaskController {
    /**
     * POST /api/tasks
     * Cria nova tarefa
     */
    async create(req: Request, userId: string) {
        try {
            const body = await req.json();
            const { title, description, status, priority, dueDate, categoryId } = body;

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
            };

            // Chama o service
            const newTask = await taskService.createTask(taskData, userId);

            return NextResponse.json(newTask, { status: 201 });
        } catch (error) {
            // Lida com erros do service (validações/regras de negócio)
            if (error instanceof Error) {
                // Erros de validação (400)
                if (error.message.includes("obrigatório") || error.message.includes("mínimo")) {
                    return NextResponse.json(
                        { error: error.message },
                        { status: 400 }
                    );
                }
                // Outros erros
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { error: "Erro ao criar tarefa." },
                { status: 500 }
            );
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

    /**
     * GET /api/tasks
     * Lista tarefas do usuário
     */
    async listByUser(searchParams: URLSearchParams, userId: string) {
        try {
            // Transforma os parâmetros de URL em um objeto de filtro simples
            const filters = Object.fromEntries(searchParams.entries());

            // Chama o service
            const tasks = await taskService.listTasksByUser(userId, filters);
            
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