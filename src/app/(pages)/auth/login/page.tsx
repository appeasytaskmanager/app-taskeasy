"use client";

import { Login } from "../../../components/view/auth/login/login";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <Login />
    </div>
  );
}