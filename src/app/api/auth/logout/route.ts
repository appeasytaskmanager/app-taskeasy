import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * Rota para logout do usuário
 * 
 * Esta rota é pública e sempre retorna sucesso.
 * O logout real é feito no frontend (limpar localStorage).
 * 
 * Aqui você pode implementar:
 * - Adicionar token a uma blacklist (se usar refresh tokens)
 * - Registrar logout em logs
 * - Limpar sessões do servidor
 * - Invalidar tokens no servidor
 */
export async function POST(req: NextRequest) {
  try {
    // Extrai o token do header (se existir) para possível invalidação futura
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    
    // Se houver token, pode ser usado para:
    // - Adicionar a uma blacklist
    // - Registrar logout em logs
    // - etc.
    
    // Por enquanto, apenas retorna sucesso
    // O logout real é feito no frontend (limpar localStorage)
    return NextResponse.json(
      { 
        success: true, 
        message: "Logout realizado com sucesso." 
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Sempre retorna sucesso para não bloquear logout no frontend
    // O logout no frontend (limpar localStorage) deve sempre funcionar
    return NextResponse.json(
      { 
        success: true, 
        message: "Logout realizado com sucesso." 
      },
      { status: 200 }
    );
  }
}

