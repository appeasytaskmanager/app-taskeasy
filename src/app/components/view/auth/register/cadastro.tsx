"use client";
import { useState } from "react";
import { Button } from "../../../ui/Button";
import Link from "next/link";

export function Cadastro() {
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleCadastro = async () => {
    const response = JSON.stringify({ name, email, password });
    const responseApi = await fetch("/api/auth/register", {
      method: "POST",
      body: response,
    });
    const data = await responseApi.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-6 p-8 bg-white rounded-2xl shadow-xl w-96 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
      <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100">
        Criar Conta
      </h2>

      <div className="flex flex-col gap-3">
        <form onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 border rounded-lg text-sm text-zinc-800 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 ring-blue-500 outline-none"
          />

          {/* <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="px-4 py-3 border rounded-lg text-sm text-zinc-800 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 ring-blue-500 outline-none"
          /> */}
        </form>
        <button
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          // type="submit"
          // onClick={handleCadastro}
          onClick={() => handleCadastro()}
        >
          Cadastrar
        </button>
      </div>

      {erro && <p className="text-sm text-red-500 text-center">{erro}</p>}

      {/* <Button title="Cadastrar" action={handleCadastro} /> */}

      <p className="text-sm text-center text-zinc-700 dark:text-zinc-300">
        Já tem conta?{" "}
        <Link
          href="/auth/login"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
