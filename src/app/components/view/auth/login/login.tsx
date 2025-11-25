"use client";

import { Button } from "@/app/components/ui/button";
import LogoEasyTask from "@/app/components/ui/logo";
import { ArrowRightIcon, CalendarRange } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin() {
    if (!email || !senha) {
      setErro("É necessário preencher todos os campos.");
      return;
    }

    setErro("");
    alert(`Login realizado com: ${email}`);
  }

  return (
    <div className="w-full">
      <LogoEasyTask />
      <div className="flex flex-col gap-6 p-8 rounded-md shadow-xl w-[460px] bg-zinc-900 border border-zinc-800">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">
            Bem-vindo de volta!
          </h2>
          <p className="text-sm text-center text-zinc-700 dark:text-zinc-300">
            Faça login para continuar
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {/* Campo de email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-xs text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border rounded-md text-sm text-zinc-800 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 ring-blue-500 outline-none"
            />
          </div>

          {/* Campo de senha */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-xs text-zinc-700 dark:text-zinc-300"
            >
              Senha
            </label>
            <input
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="px-4 py-3 border rounded-md text-sm text-zinc-800 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 ring-blue-500 outline-none"
            />
            <Link
              href="/auth/forgot-password"
              className="text-xs text-right mt-2 hover:text-zinc-900 dark:text-zinc-300 hover:dark:text-zinc-100 hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          {/* Mensagem de erro */}
          {erro && <p className="text-xs text-red-500">{erro}</p>}

          {/* Botão de login */}
          <Button
            variant="default"
            onClick={handleLogin}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Entrar
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-center text-zinc-700 dark:text-zinc-300">
          Não tem conta?{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
