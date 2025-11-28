"use client";

import { Button } from "@/app/components/ui/button";
import LogoEasyTask from "@/app/components/ui/logo";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Forgot() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErro("É necessário preencher o campo de email.");
      return;
    }

    setErro("");
    setMensagem("Enviando instruções...");

    try {
      const resp = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await resp.json().catch(() => ({}));
      setMensagem(data?.message || "Verifique seu email, por favor. Você receberá as instruções para redefinir sua senha.");
    } catch (error) {
      setMensagem("Erro ao enviar. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="w-full">
      <LogoEasyTask />
      <div className="flex flex-col gap-6 p-8 rounded-md shadow-xl w-[460px] bg-zinc-900 border border-zinc-800">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold  text-zinc-900 dark:text-zinc-100">
            Recuperar senha
          </h2>
          <p className="text-sm  text-zinc-700 dark:text-zinc-300">
            Informe seu e-mail para receber o link de recuperação
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs text-zinc-700 dark:text-zinc-300">
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

          {erro && <p className="text-xs text-red-500">{erro}</p>}
          {mensagem && <p className="text-xs text-zinc-700 dark:text-zinc-300">{mensagem}</p>}

          <Button
            variant="default"
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Enviar link
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Lembrou a senha? {" "}
          <Link href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
