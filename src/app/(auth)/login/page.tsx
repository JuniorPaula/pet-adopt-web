"use client";

import { useAuth } from "@/context/auth-context";
import { loginUser } from "@/services/auth-service";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Page() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { token, user} = await loginUser({ email, password });
      login(user, token)

      toast.success("Login realizado com sucesso!");
    } catch {
      toast.error("Erro no login, verifique suas credenciais.");
    }
  }

  return (
    <main className="w-full flex justify-center items-center px-4 py-6 bg-slate-100" style={{ height: "calc(100vh - 80px)" }}>
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md w-full max-w-md space-y-4 my-9">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 mt-2 border"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            className="w-full p-2 mb-3 mt-2 border"
            required
          />
        </div>

        <button type="submit" className="w-full mb-4 mt-2 bg-blue-500 hover:bg-blue-600 text-white p-3">
          Entrar
        </button>

        <p className="text-center text-sm">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Registre-se
          </Link>
        </p>
      </form>
    </main>
  );
}