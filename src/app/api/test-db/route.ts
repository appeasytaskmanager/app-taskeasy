import { db, sql } from "@/lib/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";

/**
 * Exemplo de API Route para testar a conexão com o banco Neon
 * GET /api/test-db
 */
export async function GET() {
  try {
    // Testar conexão com uma query simples (SQL direto)
    const sqlResult =
      await sql`SELECT NOW() as current_time, version() as pg_version`;

    // Testar conexão com Drizzle ORM - contar usuários
    const userCount = await db.select().from(users);

    return NextResponse.json({
      success: true,
      message:
        "Conexão com Neon Database e Drizzle ORM estabelecida com sucesso!",
      data: {
        sqlDirect: {
          currentTime: sqlResult[0].current_time,
          postgresVersion: sqlResult[0].pg_version,
        },
        drizzle: {
          userCount: userCount.length,
          message: "Drizzle ORM está funcionando corretamente",
        },
      },
    });
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao conectar com o banco de dados",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
