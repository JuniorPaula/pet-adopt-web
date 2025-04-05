import { Container } from "@/components/container";
import { MenuSeparator } from "@headlessui/react";
import { FaBook,FaShareAlt } from "react-icons/fa";
import { FaChartSimple, FaShareFromSquare } from "react-icons/fa6";

export default function DashboardPage() {
  return (
    <Container>
      <main className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl sm:text-3xl text-neutral-700 font-bold">Olá, Fulano de Tal</h1>
        <p className="py-2 text-gray-600">Bem-vindo ao seu painel de controle!</p>
        <MenuSeparator className="my-1 mb-8 h-px bg-gray-300" />

        <section>
          <h2 className="text-xl sm:text-2xl text-neutral-700 font-normal">Acesso rápido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
            <a href="/pets" className="shadow-md rounded-sm px-4 py-8 flex items-center gap-2 border border-green-300">
                <FaShareFromSquare className="text-green-600" size={28} />
                <p className="text-blue-500">Ver Pets disponíveis</p>
            </a>
            <a href="/adoptions" className="shadow-md rounded-sm px-4 py-8 flex items-center gap-2 border border-blue-300">
                <FaShareFromSquare className="text-blue-600" size={28} />
                <p className="text-blue-500">Ver Pets adotados</p>
            </a>
            <a href="/profile" className="shadow-md rounded-sm px-4 py-8 flex items-center gap-2 border border-yellow-300">
                <FaShareFromSquare className="text-yellow-600" size={28} />
                <p className="text-blue-500">Gerenciar meu perfil</p>
            </a>
            <a href="/pets/me" className="shadow-md rounded-sm px-4 py-8 flex items-center gap-2 border border-red-300">
                <FaShareFromSquare className="text-red-600" size={28} />
                <p className="text-blue-500">Meus Pets</p>
            </a>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl sm:text-2xl text-neutral-700 font-normal">Métricas de adoções</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="shadow-md rounded-sm px-4 py-8 flex items-center justify-between gap-2 bg-green-100 border border-green-300">
                <div>
                  <FaChartSimple className="text-green-600" size={28} />
                  <p className="text-gray-600 text-lg font-semibold">Total de adoções: </p>
                </div>
                <span className="text-2xl text-gray-600">5</span>
            </div>
            <div className="shadow-md rounded-sm px-4 py-8 flex items-center justify-between gap-2 bg-blue-100 border border-blue-300">
                <div>
                  <FaShareAlt className="text-blue-600" size={28} />
                  <p className="text-gray-600 text-lg font-semibold">Adoções pendentes: </p>
                </div>
                <span className="text-2xl text-gray-600">2</span>
            </div>
            <div className="shadow-md rounded-sm px-4 py-8 flex items-center justify-between gap-2 bg-yellow-100 border border-yellow-300">
                <div>
                  <FaBook className="text-yellow-600" size={28} />
                  <p className="text-gray-600 text-lg font-semibold">Visitas agendadas: </p>
                </div>
                <span className="text-2xl text-gray-500">3</span>
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
}