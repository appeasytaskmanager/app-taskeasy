import { NextRequest } from "next/server";
import { CategoryController } from "@/modules/categories/category.controller";

const categoryController = new CategoryController();

/**
 * POST /api/categories
 * Cria uma nova categoria para o usuário autenticado
 */
export async function POST(request: NextRequest) {
  return categoryController.create(request);
}

/**
 * GET /api/categories
 * Lista todas as categorias do usuário autenticado
 */
export async function GET(request: NextRequest) {
  return categoryController.listByUser(request);
}
