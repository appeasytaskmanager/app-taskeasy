import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * Exemplo de API Route usando Drizzle ORM com parâmetros
 * GET /api/users/[id] - Buscar usuário por ID
 * PUT /api/users/[id] - Atualizar usuário
 * DELETE /api/users/[id] - Deletar usuário
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, params.id))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { success: false, message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user[0],
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar usuário",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, email } = body;

    const updatedUser = await db
      .update(users)
      .set({
        name,
        email,
        updatedAt: new Date(),
      })
      .where(eq(users.id, params.id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json(
        { success: false, message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedUser[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao atualizar usuário",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, params.id))
      .returning();

    if (deletedUser.length === 0) {
      return NextResponse.json(
        { success: false, message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Usuário deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao deletar usuário",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
