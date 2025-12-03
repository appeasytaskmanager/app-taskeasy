import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { CategoryService } from "./category.service";
import { authMiddleware } from "@/lib/auth";
import { NewCategory } from "@/db";
import { NextResponse } from "next/server"

const categoryService = new CategoryService();

export class CategoryController {
    // Post /api/categories
    
    async create(req: Request) {
            // 1. AUTENTICAÇÃO
            const authResult = authMiddleware(req as NextRequest);
            if (authResult.response) {
                return authResult.response; // 401 Unauthorized
            }
            const userId = authResult.userId as string;

            try {
                const data: NewCategory = await req.json();

                // 2. LÓGICA DE NEGÓCIO: Injeta o userId e chama o Service
                const newCategory = await categoryService.createCategory({ ...data, userId }, userId);
                
                // Revalida o cache das páginas que exibem categorias
                revalidatePath("/dashboard");
                revalidatePath("/tasks");
                revalidatePath("/reports");

                return NextResponse.json(newCategory,
                    { status: 201 }); // 201 Created
            } catch (error) {

                if (error instanceof Error){
                    return NextResponse.json({ error: error.message }, { status: 400 }); //bad request
                }
            }  
        }

    async getById (req: Request, id: string) {
        const authResult = authMiddleware(req as NextRequest);

        if (authResult.response){
            return authResult.response; //401
        }

        const userId = authResult.userId as string;

        try {
            const category = await categoryService.getCategoryById(id, userId);

            return NextResponse.json(category, 
                { status: 200}) // Deu certo
        } catch (error) {
            if (error instanceof Error){
                if (error.message.includes("não encontrada") || error.message.includes("negado")){
                    return NextResponse.json({ error: error.message }, { status: 404 });
                }
            }
            return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
        }
    }
    
    async listByUser(req: Request) {
        const authResult = authMiddleware(req as NextRequest);
        if (authResult.response) {
            return authResult.response;
        }

        const userId = authResult.userId as string;

        try {
            const categories = await categoryService.listCategoriesByUser(userId);
            return NextResponse.json(categories, { status: 200});

        } catch (error){
            if (error instanceof Error){
                return NextResponse.json({
                    error: "Erro ao listar categorias",
                    status: 500
                })
            }
        }
    }

    async update(req: Request, id: string){
        const authResult = authMiddleware(req as NextRequest);
        if (authResult.response) {
            return authResult.response;
        }

        const userId = authResult.userId as string;
        const data = await req.json();

        try {
            const updatedCategory = await categoryService.updateCategory(id, userId, data);

            // Revalida o cache das páginas que exibem categorias
            revalidatePath("/dashboard");
            revalidatePath("/tasks");
            revalidatePath("/reports");

            return NextResponse.json(updatedCategory, { status: 200 });
        } catch (error){
            if(error instanceof Error){
                const status = error.message.includes("atualizar") ? 404 : 400;
                return NextResponse.json({ error: error.message }, { status });
            }
        }
    }

    async delete(req: Request, id: string) {
       
        const authResult = authMiddleware(req as NextRequest);
        if (authResult.response) {
            return authResult.response;
        }
        const userId = authResult.userId as string;

        try {
            await categoryService.deleteCategory(id, userId);

            // Revalida o cache das páginas que exibem categorias
            revalidatePath("/dashboard");
            revalidatePath("/tasks");
            revalidatePath("/reports");

            return new Response(null, { status: 204 }); // 204 No Content
        } catch (error){ 
            if(error instanceof Error){
                return NextResponse.json({ error: error.message }, { status: 404 });
            }
        }
    }
}