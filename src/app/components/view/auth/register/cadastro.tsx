"use client";
import { useState } from "react";
import { Button } from "../../../ui/Button";
import Link from "next/link";

export function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleCadastro() {
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");
    alert(`Cadastro realizado com: ${nome} (${email})`);
  }

  return (
    <div className="flex flex-col gap-6 p-8 bg-white rounded-2xl shadow-xl w-96 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
      <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100">
        Criar Conta
      </h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="px-4 py-3 border rounded-lg text-sm text-zinc-800 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 ring-blue-500 outline-none"
        />

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

        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="px-4 py-3 border rounded-lg text-sm text-zinc-800 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 ring-blue-500 outline-none"
        />
      </div>

      {erro && <p className="text-sm text-red-500 text-center">{erro}</p>}

      <Button title="Cadastrar" action={handleCadastro} />

      <p className="text-sm text-center text-zinc-700 dark:text-zinc-300">
        Já tem conta?{" "}

        <Link href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">Entrar</Link>
      </p>
    </div>
  );
}