import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validação de campos obrigatórios
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios!" }, 
        { status: 400 }
      );
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Formato de email inválido." },
        { status: 400 }
      );
    }

    // Validação de tamanho mínimo da senha
    if (password.length < 8) {
      return NextResponse.json(
        { error: "A senha deve ter no mínimo 8 caracteres." },
        { status: 400 }
      );
    }

    // Verifica se já existe email
    let existingUser;
    try {
      existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    } catch (dbError: any) {
      console.error("Erro ao verificar email existente:", dbError);
      // Se for erro de conexão ou schema, retorna erro específico
      if (dbError.message?.includes('DATABASE_URL') || dbError.message?.includes('connection')) {
        return NextResponse.json(
          { error: "Erro de conexão com o banco de dados. Verifique a configuração." },
          { status: 500 }
        );
      }
      throw dbError; // Re-lança para ser capturado no catch geral
    }

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Este email já está cadastrado. Tente fazer login ou use outro email." },
        { status: 409 }
      );
    }

    // Hash da senha
    let hashedPassword;
    try {
      hashedPassword = await hash(password, 10);
    } catch (hashError) {
      console.error("Erro ao fazer hash da senha:", hashError);
      return NextResponse.json(
        { error: "Erro ao processar senha. Tente novamente." },
        { status: 500 }
      );
    }

    // Insere novo usuário
    let newUser;
    try {
      [newUser] = await db
        .insert(users)
        .values({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: hashedPassword,
        })
        .returning();
    } catch (insertError: any) {
      console.error("Erro ao inserir usuário:", insertError);
      
      // Verifica se é erro de schema (tabela não existe)
      if (insertError.message?.includes('relation') || insertError.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: "Erro de configuração do banco de dados. Execute as migrations." },
          { status: 500 }
        );
      }
      
      // Verifica se é erro de constraint (email duplicado - race condition)
      if (insertError.message?.includes('unique') || insertError.message?.includes('duplicate')) {
        return NextResponse.json(
          { error: "Este email já está cadastrado. Tente fazer login ou use outro email." },
          { status: 409 }
        );
      }
      
      throw insertError; // Re-lança para ser capturado no catch geral
    }

    if (!newUser) {
      return NextResponse.json(
        { error: "Erro ao criar usuário. Tente novamente." },
        { status: 500 }
      );
    }

    // Remove a senha da resposta
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (err: any) {
    console.error("Erro ao cadastrar usuário:", err);
    
    // Mensagem de erro mais específica baseada no tipo de erro
    let errorMessage = "Erro interno do servidor. Tente novamente mais tarde.";
    
    if (err.message?.includes('DATABASE_URL')) {
      errorMessage = "Erro de configuração: DATABASE_URL não está definida.";
    } else if (err.message?.includes('connection') || err.message?.includes('ECONNREFUSED')) {
      errorMessage = "Erro de conexão com o banco de dados. Verifique se o banco está acessível.";
    } else if (err.message?.includes('relation') || err.message?.includes('does not exist')) {
      errorMessage = "Erro de configuração: Tabela não encontrada. Execute 'npm run db:push' para criar as tabelas.";
    } else if (err.message?.includes('timeout')) {
      errorMessage = "Tempo de conexão esgotado. Tente novamente.";
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
