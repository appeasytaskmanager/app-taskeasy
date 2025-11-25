// src/app/api/profile/route.ts

import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/auth"; // Importa o middleware que você criou

/**
 * GET /api/profile
 * Rota Protegida para testar o JWT.
 */
export async function GET(req: NextRequest) {
    
    // 1. CHAMA O MIDDLEWARE: Verifica o token
    const { userId, response } = authMiddleware(req); 

    // 2. SE HOUVER RESPOSTA (erro 401): Retorna o erro imediatamente
    if (response) {
        return response; 
    }

    // 3. SUCESSO: Se chegou aqui, o token é válido e temos o ID do usuário!
    return NextResponse.json({ 
        success: true, 
        message: "Acesso Autorizado! O Token JWT é válido.",
        user_id_from_token: userId 
    });
}