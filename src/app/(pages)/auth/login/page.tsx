"use client";

import { Login } from "../../../components/view/auth/login/login";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-linear-to-b from-zinc-900 to-zinc-800">
      <div className="flex items-center justify-center p-4 md:p-8">
        <Login />
      </div>
    </div>
  );
}
