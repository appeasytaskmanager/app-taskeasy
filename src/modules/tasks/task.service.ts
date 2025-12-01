import { TaskRepository } from "./task.repository";
import { NewTask, Task} from "../../db/schema/tasks";
import { tasks } from "../../db/schema";

export type UpdateTaskData = Partial<typeof tasks.$inferSelect>;

export type TaskFilters = {
    status?: Task["status"];
    priority?: Task["priority"];
    categoryId?: string;
};


//Esse aquivo comunica com o repository

const taskRepository = new TaskRepository(); //Instancia o repository para usar os métodos definidos la no outro arquivo

export class TaskService {
    async createTask (data: NewTask, userId: string): Promise<Task> {
        if (data.userId !== userId) {
            throw new Error("Não é permitido criar tarefas para outro usuário.");
        }

        //validação
        if (!data.title || data.title.length < 3) {
            throw new Error("O título da tarefa é obrigatório e deve ter no mínimo 3 caracteres.");
        }

        return await taskRepository.create(data);
    }

    async getTaskById(id: string, userId: string): Promise<Task> {
        const task = await taskRepository.findByIdAndUser(id, userId);

        //Verificar existência
        if(!task){
            throw new Error("Tarefa não encontrada ou acesso negado!");
        }

        return task;
    }

    async listTasksByUser(userId: string, filters?: TaskFilters): Promise<Task[]> {
        //Processamento de filtros
        //Transforma em objetos para o repository utilizar  
        return await taskRepository.listByUser(userId, filters);
    }

    async updateTask(id: string, userId: string, data: UpdateTaskData): Promise<Task> {
        // 🚨 REGRA DE NEGÓCIO 6: Validação de Propriedades
        // Exemplo: Se 'completedAt' for enviado, o 'status' deve ser automaticamente 'completed'.
        if (data.completedAt) {
            data.status = 'completed';
        }

        const updatedTask = await taskRepository.update(id, userId, data);

        if (!updatedTask) {
            throw new Error("Não foi possível atualizar a tarefa (acesso negado ou não existente).");
        }

        return updatedTask;
    }

    async deleteTask (id: string, userId: string): Promise<void> {
        const deletedTask = await taskRepository.delete(id, userId);

        //verificação de delete
        if(!deletedTask) {
            throw new Error("Não foi possível deletar essa tarefa (Acesso negado ou inexistente");
        }
    }
}