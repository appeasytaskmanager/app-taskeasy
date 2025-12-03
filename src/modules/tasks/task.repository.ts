import { db } from "@/lib/db";
import { tasks, NewTask, Task } from "@/db/schema/tasks";
import { eq, and, asc } from "drizzle-orm";
import { TaskFilters } from "@/modules/tasks/task.service";

//Esse arquivo comunica com o database

interface UpdateTaskData {
  title?: string;
  description?: string | null;
  status?: Task["status"]; //"pending", "in_progress", "completed","cancelled";
  priority?: Task["priority"]; //low, medium, high
  categoryId?: string | null;
  dueDate?: Date | null;
}

export class TaskRepository {
  //Create
  async create(data: NewTask): Promise<Task> {
    const [newTask] = await db.insert(tasks).values(data).returning();

    return newTask;
  }

  //read com ID e User -> recebe o ID da task e o ID do user
  // Garante que o user só acessa as suas tarefas

  async findByIdAndUser(id: string, userId: string): Promise<Task | undefined> {
    const result = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
      .limit(1);

    return result[0];
  }

  async listByUser(userId: string, _filters?: unknown): Promise<Task[]> {
    // Filtra apenas tarefas não deletadas (soft delete)
    return await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.userId, userId), eq(tasks.isDeleted, false)))
      .orderBy(asc(tasks.createdAt));
  }

  async update(
    id: string,
    userId: string,
    data: UpdateTaskData
  ): Promise<Task | undefined> {
    const [updatedTask] = await db
      .update(tasks)
      .set(data)
      .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
      .returning(); // retorno do que foi feito
    return updatedTask;
  }

  async delete(id: string, userId: string): Promise<Task | undefined> {
    const [deletedTask] = await db
      .delete(tasks)
      .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
      .returning();
    return deletedTask;
  }
}
