import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Verifica se já existe email
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Email já registrado" },
        { status: 409 }
      );
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10);

    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    return NextResponse.json({ success: true, user: newUser[0] });
  } catch (err) {
    console.error("ocorreu um erro ao cadastrar o usuario" + err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
