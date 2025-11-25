import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm"
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const {email, password} = await req.json();

        //validação do input
        if (!email || !password) {
            return NextResponse.json(
                {error: "Email e senha são obrigatórios!"}, {status: 400}
            );
    }

        //Busca usuário pelo email

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    //Verifica se o user existe  

    if (existingUser.length === 0) {
        return NextResponse.json(
            {error: "Usuário não encontrado!"},
            {status: 401}
        );
    }

    const user = existingUser[0];

    //compara a senha (Hash)

    const passwordMatch = await compare(password, user.password!);

    if (!passwordMatch) {
        return NextResponse.json(
            {error: "Credenciais Inválidas!"},
            {status: 401}
        );
    }

    // Implementando segredo JWT

    const JWT_SECRET = process.env.JWT_SECRET!;

    if (passwordMatch) {
        
        if (!JWT_SECRET) {
            throw new Error("JWT Não configurado");
        }
    }

    // Gera o Token
    const token = jwt.sign(
        { userId: user.id, email: user.email }, //Payload com ID do user
        JWT_SECRET,
        { expiresIn: "1d"}
    );

    // Retorna o token e o usuário sem a senha

    const userWithoutPassword = { // Cria um objeto sem a senha
    id: user.id,
    name: user.name,
    email: user.email,
    isActive: user.isActive, // Exemplo de campo
    };

    return NextResponse.json(
        { success: true,
        user: userWithoutPassword,
        token: token,
        message: "Login realizado com sucesso."
        },
        { status: 200 }
    );

} catch (error) {
    console.error("Erro ao realizar login: ", error);
    return NextResponse.json(
        {error: "Erro interno do servidor"},
        {status: 500}
    );
}
}

