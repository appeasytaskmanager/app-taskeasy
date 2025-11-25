"use client";

import { Button } from "@/app/components/ui/button";
import LogoEasyTask from "@/app/components/ui/logo";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Cadastro() {
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErro("É necessário preencher todos os campos.");
      return;
    }

    setErro("");
    const response = JSON.stringify({ name, email, password });
    const responseApi = await fetch("/api/auth/register", {
      method: "POST",
      body: response,
    });
    const data = await responseApi.json();
    console.log(data);
  };

  return (
    <div className="w-full">
      <LogoEasyTask />
      <div className="flex flex-col gap-6 p-8 rounded-md shadow-xl w-[460px] bg-zinc-900 border border-zinc-800">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold  text-zinc-900 dark:text-zinc-100">
            Criar Conta
          </h2>
          <p className="text-sm  text-zinc-700 dark:text-zinc-300">
            Cadastre-se para começar
          </p>
        </div>

        <form onSubmit={handleCadastro} className="flex flex-col gap-5">
          {/* Campo de nome */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-xs text-zinc-700 dark:text-zinc-300"
            >
              Nome
            </label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setNome(e.target.value)}
              className="px-4 py-3 border rounded-md text-sm text-zinc-800 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 ring-blue-500 outline-none"
            />
          </div>

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 border rounded-md text-sm text-zinc-800 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 ring-blue-500 outline-none"
            />
          </div>

          {/* Mensagem de erro */}
          {erro && <p className="text-xs text-red-500">{erro}</p>}

          {/* Botão de cadastro */}
          <Button
            variant="default"
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Cadastrar
          </Button>
        </form>

        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Já tem conta?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
