import { NextRequest } from "next/server";
import { CategoryController } from '@/modules/categories/category.controller'; 

const categoryController = new CategoryController();

interface RouteContext {
    params: {
        id: string; // O ID da categoria passado na URL
    };
}

// GET (READ ONE) -> Rota: GET /api/categories/:id

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params; 

    return categoryController.getById(request, id);
}


// PUT/PATCH (UPDATE) -> Rota: PUT/PATCH /api/categories/:id

export async function PUT(req: NextRequest, context: RouteContext) {
    const { id } = await context.params;

    return categoryController.update(req, id);
}

// DELETE -> Rota: DELETE /api/categories/:id

export async function DELETE(req: NextRequest, context: RouteContext) {
    const { id } = await context.params;

    return categoryController.delete(req, id);
}