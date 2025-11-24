"use client";

import { Cadastro } from "@/app/components/view/auth/register/cadastro";



export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <Cadastro />
    </div>
  );
}