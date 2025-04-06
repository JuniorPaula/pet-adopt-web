"use client";

import { useAuth } from "@/context/auth-context";
import { MenuSeparator } from "@headlessui/react";

export function HeaderDashboard() {
  const { user } = useAuth();

  return (
    <>
      <h1 className="text-2xl sm:text-3xl text-neutral-700 font-bold">Olá, { user?.first_name } { user?.last_name }</h1>
      <p className="py-2 text-gray-600">Bem-vindo ao seu painel de controle!</p>
      <MenuSeparator className="my-1 mb-8 h-px bg-gray-300" />
    </>
  )
}