import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/categories/default
 * Obtém ou cria a categoria padrão "Geral"
 * Útil para garantir que sempre há uma categoria disponível
 */
export async function GET() {
  try {
    const defaultCategoryName = "Geral";
    
    // Tenta buscar a categoria padrão
    const existing = await db
      .select()
      .from(categories)
      .where(eq(categories.name, defaultCategoryName))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(existing[0], { status: 200 });
    }

    // Se não existir, cria
    const [newCategory] = await db
      .insert(categories)
      .values({ name: defaultCategoryName })
      .returning();

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao obter/criar categoria padrão:", error);
    return NextResponse.json(
      { error: "Erro ao obter categoria padrão." },
      { status: 500 }
    );
  }
}

