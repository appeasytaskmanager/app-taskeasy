"use client";

import { Button } from "@/app/components/ui/button";
import LogoEasyTask from "@/app/components/ui/logo";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Cadastro() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState | "general", string>>
  >({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  function handleChange<K extends keyof FormState>(key: K, value: string) {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined, general: undefined }));
  }

  const senhaTemMaiuscula = /[A-Z]/.test(form.password);

  async function validateAll(): Promise<boolean> {
    const newErrors: typeof errors = {};

    // Nome
    if (!form.name.trim()) {
      newErrors.name = "Nome é obrigatório.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Nome deve ter no mínimo 2 caracteres.";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email é obrigatório.";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Formato de email inválido.";
    }

    // Senha
    if (!form.password) {
      newErrors.password = "Senha é obrigatória.";
    } else if (form.password.length < 8) {
      newErrors.password = "A senha deve ter no mínimo 8 caracteres.";
    }

    // Confirmar Senha
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória.";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();

    const ok = await validateAll();
    if (!ok) return;

    setLoading(true);
    setErrors({});

    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      // O redirecionamento é feito automaticamente pelo AuthContext após login
    } catch (error: any) {
      // Extrai a mensagem de erro silenciosamente (sem logar no console)
      let errorMessage = "Erro ao realizar cadastro. Tente novamente.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Verifica se é erro de email duplicado (409) ou mensagem relacionada
      const lowerMessage = errorMessage.toLowerCase();
      const isEmailError = 
        lowerMessage.includes('email') && 
        (lowerMessage.includes('cadastrado') || 
         lowerMessage.includes('já está') ||
         lowerMessage.includes('já existe') ||
         lowerMessage.includes('já registrado') ||
         lowerMessage.includes('duplicado'));
      
      if (isEmailError) {
        // Exibe erro no campo de email (em vermelho abaixo do campo)
        setErrors({ 
          email: errorMessage, 
          general: undefined 
        });
      } else {
        // Exibe erro geral abaixo dos campos em destaque (caixa vermelha)
        setErrors({ 
          general: errorMessage,
          email: undefined 
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <LogoEasyTask />

      <div className="flex flex-col gap-6 p-8 rounded-md shadow-xl w-[460px] bg-zinc-900 border border-zinc-800">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-zinc-100">Criar Conta</h2>
          <p className="text-sm text-zinc-300">Cadastre-se para começar</p>
        </div>

        <form onSubmit={handleCadastro} className="flex flex-col gap-5">
          {/* Nome */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-300">Nome</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="px-4 py-3 border rounded-md text-sm dark:bg-zinc-800 border-zinc-700 text-zinc-100"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-300">Email</label>
            <input
              type="email"
              placeholder="exemplo@email.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="px-4 py-3 border rounded-md text-sm dark:bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-2 ring-blue-500 outline-none"
            />

            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-300">Senha</label>
            <div className="flex items-center border rounded-md dark:bg-zinc-800 border-zinc-700">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="flex-1 px-4 py-3 text-sm bg-transparent text-zinc-100 placeholder-zinc-400 focus:outline-none rounded-l-md"
              />

              <button
                type="button"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                onClick={() => setShowPassword((v) => !v)}
                className="px-3 grid place-items-center text-zinc-400 hover:text-zinc-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Mínimo 8 caracteres. Recomendado incluir letra maiúscula.
            </p>

            {!senhaTemMaiuscula && form.password.length >= 8 && (
              <p className="text-xs text-yellow-500">
                Recomendação: adicione ao menos uma letra maiúscula.
              </p>
            )}

            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirmar senha */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-300">Confirmar Senha</label>
            <div className="flex items-center border rounded-md dark:bg-zinc-800 border-zinc-700">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={form.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                className="flex-1 px-4 py-3 text-sm bg-transparent text-zinc-100 placeholder-zinc-400 focus:outline-none rounded-l-md"
              />

              <button
                type="button"
                aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="px-3 grid place-items-center text-zinc-400 hover:text-zinc-200"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Erro geral */}
          {errors.general && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                {errors.general}
              </p>
            </div>
          )}

          {/* Botão */}
          <Button
            variant="default"
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>

        <p className="text-sm text-zinc-300">
          Já tem conta?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
