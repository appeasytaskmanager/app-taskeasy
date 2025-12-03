import { NextRequest } from "next/server";
import { CategoryController } from '@/modules/categories/category.controller'; 

const categoryController = new CategoryController();

// POST (CREATE) -> Rota: POST /api/categories

export async function POST(request: NextRequest) {
    return categoryController.create(request); 
}

// GET (READ ALL) -> Rota: GET /api/categories

export async function GET(request: NextRequest) {
    // O Controller listByUser precisa do objeto Request para autenticação
    return categoryController.listByUser(request); 
}