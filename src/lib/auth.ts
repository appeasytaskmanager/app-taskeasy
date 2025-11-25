import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

// Função que verifica o token e retorna o ID do User ou erro
export function authMiddleware(req: NextRequest): { userId: string | null; response?: NextResponse } {
    const authHeader = req.headers.get("Authorization");

    // Verifica se o header Auth está presente
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
            userId: null,
            response: NextResponse.json(
                { error: "Acesso Negado. Token não fornecido" },
                { status: 401 }
            )
        };
    }

    const token = authHeader.split(" ")[1];

    try {
        if (!JWT_SECRET) {
            // Só para develop, nunca em produção
            throw new Error("JWT_SECRET Não configurado na variável de ambiente");
        }

        // verifica se decodifica o token usando o JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { userId?: string };

        // retorna o ID do user contido no Payload
        return { userId: decoded.userId ?? null };
    } catch (err) {
        // token inválido (expirado, modificado, segredo errado, etc..)
        return {
            userId: null,
            response: NextResponse.json(
                { error: "Token inválido ou expirado, faça login novamente" },
                { status: 401 }
            )
        };
    }
}