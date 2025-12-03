// src/app/api/profile/route.ts

import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/profile
 * Retorna os dados do usuário autenticado
 */
export async function GET(req: NextRequest) {
    // 1. Verifica o token
    const { userId, response } = authMiddleware(req); 

    // 2. Se houver erro de autenticação, retorna
    if (response || !userId) {
        return response || NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    try {
        // 3. Busca os dados do usuário no banco
        const [user] = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                isActive: users.isActive,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
            })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (!user) {
            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }

        // 4. Retorna os dados do usuário (sem a senha)
        return NextResponse.json(user);
    } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/profile
 * Atualiza os dados do usuário autenticado
 */
export async function PUT(req: NextRequest) {
    // 1. Verifica o token
    const { userId, response } = authMiddleware(req); 

    // 2. Se houver erro de autenticação, retorna
    if (response || !userId) {
        return response || NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    try {
        const data = await req.json();
        const { name, email } = data;

        // 3. Validação básica
        if (email) {
            // Verifica se o email já está em uso por outro usuário
            const existingUser = await db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .limit(1);

            if (existingUser.length > 0 && existingUser[0].id !== userId) {
                return NextResponse.json(
                    { error: "Email já está em uso" },
                    { status: 409 }
                );
            }
        }

        // 4. Atualiza o usuário
        const [updatedUser] = await db
            .update(users)
            .set({
                ...(name && { name }),
                ...(email && { email }),
                updatedAt: new Date(),
            })
            .where(eq(users.id, userId))
            .returning({
                id: users.id,
                name: users.name,
                email: users.email,
                isActive: users.isActive,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
            });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

