import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/categories
 * Lista todas as categorias disponíveis
 */
export async function GET() {
  try {
    const allCategories = await db
      .select()
      .from(categories)
      .orderBy(categories.name);

    return NextResponse.json(allCategories, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json(
      { error: "Erro ao buscar categorias." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/categories
 * Cria uma nova categoria (opcional - para uso futuro)
 */
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Nome da categoria é obrigatório." },
        { status: 400 }
      );
    }

    // Verifica se já existe
    const existing = await db
      .select()
      .from(categories)
      .where(eq(categories.name, name.trim()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Esta categoria já existe." },
        { status: 409 }
      );
    }

    const [newCategory] = await db
      .insert(categories)
      .values({ name: name.trim() })
      .returning();

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar categoria:", error);
    return NextResponse.json(
      { error: "Erro ao criar categoria." },
      { status: 500 }
    );
  }
}

