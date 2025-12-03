import { CategoryRepository } from "./category.repository";
import { NewCategory, Category } from "../../db/schema/categories";
import { UpdateCategoryData } from "./category.repository";

const categoryRepository = new CategoryRepository();

export class CategoryService { 
    async createCategory(data: NewCategory, userId: string): Promise<Category> {

        if (data.userId !== userId) {
            throw new Error("Não permitido registrar categorias em outro usuário.")
        }

        if (!data.name || data.name.length < 2) {
            throw new Error("O nome da categoria é obrigatório e deve ter no mínimo 2 caracteres");
        }
        
        return await categoryRepository.create(data);
    }

    // 2. Buscar uma categoria por ID | GET
    async getCategoryById(id: string, userId: string): Promise<Category> {
        const category = await categoryRepository.findByIdAndUser(id, userId);

        // Verificação de Existência e Acesso
        if (!category) {
            throw new Error("Categoria não encontrada ou acesso negado.");
        }
        
        return category;
    }

    // Buscar todas (listagem)

    async listCategoriesByUser(userId: string): Promise<Category[]> {
        // A regra de segurança é aplicada diretamente pelo Repository (filtrando por userId)
        return await categoryRepository.listByUser(userId);
    }

    async updateCategory(id: string, userId: string, data: UpdateCategoryData): Promise<Category> {
        if (data.name === "") {
            throw new Error("O nome da categoria não pode ser vazio.")
        }

        const updatedCategory = await categoryRepository.update(id, userId, data);

        if (!updatedCategory) {
            throw new Error("Não foi possível atualizar a categoria (acesso negado ou não existente).")
        }

        return updatedCategory;
    }
    
    async deleteCategory(id: string, userId: string): Promise<void> {
        const deletedCategory = await categoryRepository.delete(id, userId);
        
        if (!deletedCategory) {
            throw new Error("Não foi possível deletar a categoria (acesso negado ou inexistente).");
        }
    }
}