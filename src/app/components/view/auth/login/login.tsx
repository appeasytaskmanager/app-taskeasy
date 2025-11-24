"use client";
import { useState } from "react";
import { Button } from "../../../ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin() {
    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    setErro("");
    alert(`Login realizado com: ${email}`);
  }

  return (
    <div className="flex flex-col gap-6 p-8 bg-white rounded-2xl shadow-xl w-96 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
      <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100">
        Gerenciador de Tarefas
      </h2>

      <div className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 border rounded-lg text-sm text-zinc-800 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 ring-blue-500 outline-none"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="px-4 py-3 border rounded-lg text-sm text-zinc-800 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 ring-blue-500 outline-none"
        />
      </div>

      {erro && <p className="text-sm text-red-500 text-center">{erro}</p>}

      <Button title="Entrar" action={handleLogin} />

      <p className="text-sm text-center text-zinc-700 dark:text-zinc-300">
        Não tem conta?{" "}
      
        <Link href="/auth/register" className="text-blue-600 dark:text-blue-400 hover:underline">Cadastre-se</Link>
      </p>
    </div>
  );
}
