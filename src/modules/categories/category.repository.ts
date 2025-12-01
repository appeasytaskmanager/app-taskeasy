import { db } from "../../lib/db"
import { categories, NewCategory, Category } from "../../db/schema/categories";
import { eq, and, asc } from "drizzle-orm";

export interface UpdateCategoryData {
    name?: string;
}

export class CategoryRepository {

    //Recebe uma nova categoria, incluindo o userId injetado pelo service/controller 
    async create(data: NewCategory): Promise<Category> {
        const [NewCategory] = await db
        .insert(categories)
        .values(data)
        .returning();

        console.log(NewCategory);

        return NewCategory;
    }

    // Garante que o usuário só pode buscar suas próprias categorias
    async findByIdAndUser (id: string, userId: string): Promise<Category | undefined> {
        return await db
        .select()
        .from(categories)
        .where(and(eq(categories.id, id), eq(categories.userId, userId)))
        .limit(1)
        .execute()
        .then(rows => rows[0]);
    }

    //Lista todas categorias pertencentes ao user
    async listByUser(userId: string): Promise <Category[]> {
        return await db
        .select()
        .from(categories)
        .where(eq(categories.userId, userId))
        .orderBy(asc(categories.name))
        .execute();
    }

    // Garante que o user só pode atualizar suas próprias categorias
    async update(id: string, userId: string, data: UpdateCategoryData): Promise <Category | undefined> {
        const [updatedCategory] = await db
        .update(categories)
        .set(data)
        .where(and(eq(categories.id, id), eq(categories.userId, userId)))
        .returning()

        return updatedCategory;
    }

    //Garante que o user só pode deletar suas categorias
    async delete (id: string, userId: string): Promise<Category | undefined> {
        const [deletedCategory] = await db
        .delete(categories)
        .where(and(eq(categories.id, id), eq(categories.userId, userId)))
        .returning();

        return deletedCategory;
    }
}
