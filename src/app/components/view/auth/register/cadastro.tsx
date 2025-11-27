"use client";

import { Button } from "@/app/components/ui/button";
import LogoEasyTask from "@/app/components/ui/logo";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const mockExistingEmails = [
  "admin@example.com",
  "user@teste.com",
  "teste@domain.com",
];

async function checkEmailExists(email: string): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 700));
  return mockExistingEmails.includes(email.toLowerCase());
}

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

  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange<K extends keyof FormState>(key: K, value: string) {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined, general: undefined }));
    if (key === "email") setEmailAvailable(null);
  }

  const senhaTemMaiuscula = /[A-Z]/.test(form.password);

  async function validateAll(): Promise<boolean> {
    const newErrors: typeof errors = {};

    // Nome
    if (!form.name.trim()) newErrors.name = "Nome é obrigatório.";

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email é obrigatório.";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Formato de email inválido.";
    } else {
      setCheckingEmail(true);
      try {
        const exists = await checkEmailExists(form.email.trim());
        setEmailAvailable(!exists);
        if (exists) newErrors.email = "Este email já está cadastrado.";
      } finally {
        setCheckingEmail(false);
      }
    }

    // Senha
    if (!form.password) {
      newErrors.password = "Senha é obrigatória.";
    } else if (form.password.length < 8) {
      newErrors.password = "A senha deve ter no mínimo 8 caracteres.";
    }

    // Confirmar Senha
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();

    const ok = await validateAll();
    if (!ok) return;

    try {
      const response = JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      const responseApi = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: response,
      });

      const data = await responseApi.json();
      console.log(data);

      alert("Cadastro realizado com sucesso!");

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setEmailAvailable(null);
      setErrors({});
    } catch {
      setErrors({ general: "Erro ao realizar cadastro. Tente novamente." });
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
              onBlur={async () => {
                if (form.email.trim() && emailRegex.test(form.email.trim())) {
                  setCheckingEmail(true);
                  const exists = await checkEmailExists(form.email.trim());
                  setEmailAvailable(!exists);
                  if (exists)
                    setErrors((prev) => ({
                      ...prev,
                      email: "Este email já está cadastrado.",
                    }));
                  setCheckingEmail(false);
                }
              }}
              className="px-4 py-3 border rounded-md text-sm dark:bg-zinc-800 border-zinc-700 text-zinc-100"
            />

            <p className="text-xs text-zinc-400">
              {checkingEmail
                ? "Verificando..."
                : emailAvailable === true
                ? "Email disponível"
                : emailAvailable === false
                ? "Email já cadastrado"
                : "Informe um email válido"}
            </p>

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
            <p className="text-xs text-red-500">{errors.general}</p>
          )}

          {/* Botão */}
          <Button
            variant="default"
            type="submit"
            disabled={checkingEmail}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Cadastrar
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
