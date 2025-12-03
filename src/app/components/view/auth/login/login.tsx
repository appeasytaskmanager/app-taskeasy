"use client";

import { Button } from "@/app/components/ui/button";
import LogoEasyTask from "@/app/components/ui/logo";
import { ArrowRightIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email || !senha) {
      setErro("É necessário preencher todos os campos.");
      return;
    }

    setErro("");
    setLoading(true);

    try {
      await login(email, senha);
      // O redirecionamento é feito automaticamente pelo AuthContext
    } catch (error: any) {
      // Extrai a mensagem de erro silenciosamente (sem logar no console)
      let errorMessage = "Erro ao fazer login. Tente novamente.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Exibe apenas a mensagem amigável abaixo dos campos
      setErro(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <LogoEasyTask />
      <div className="flex flex-col gap-6 p-8 rounded-md shadow-xl w-[460px] bg-zinc-900 border border-zinc-800">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold  text-zinc-900 dark:text-zinc-100">
            Bem-vindo de volta!
          </h2>
          <p className="text-sm  text-zinc-700 dark:text-zinc-300">
            Faça login para continuar
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
              id="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !loading) {
                  handleLogin(e);
                }
              }}
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
            <div className="flex items-center border rounded-md dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading) {
                    handleLogin(e);
                  }
                }}
                className="flex-1 px-4 py-3 text-sm bg-transparent text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none rounded-l-md"
              />
              <button
                type="button"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                onClick={() => setShowPassword((v) => !v)}
                className="px-3 grid place-items-center text-zinc-400 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                {erro}
              </p>
            </div>
          )}

          {/* Botão de login */}
          <Button
            type="submit"
            variant="default"
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
            {!loading && <ArrowRightIcon className="w-4 h-4" />}
          </Button>
        </form>

        <p className="text-sm text-zinc-700 dark:text-zinc-300">
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
