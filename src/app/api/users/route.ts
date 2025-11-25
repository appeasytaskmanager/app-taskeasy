import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * Exemplo de API Route usando Drizzle ORM
 * GET /api/users - Listar todos os usuários
 * POST /api/users - Criar um novo usuário
 */
export async function GET() {
  try {
    const allUsers = await db.select().from(users);

    return NextResponse.json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar usuários",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email é obrigatório" },
        { status: 400 }
      );
    }

    const newUser = await db
      .insert(users)
      .values({
        email,
        name,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: newUser[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao criar usuário",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

