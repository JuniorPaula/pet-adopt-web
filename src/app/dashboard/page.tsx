import { Container } from "@/components/container";
import { FaBook, FaShareAlt } from "react-icons/fa";
import { FaChartSimple, FaShareFromSquare } from "react-icons/fa6";
import { getTokenFromCookie } from "@/services/get-token-from-cookie";
import { createApi } from "@/services/axios-service";
import { AdoptProps } from "@/types/adopt.type";
import { HeaderDashboard } from "./components/header-dashboard";
import Link from "next/link";

interface AdoptionMetrics {
  adoptions: AdoptProps[];
  meta: {
    adoption_count: number;
    visit_count: number;
    visit_scheduled_count: number;
  }
}

async function getData() {
  const token = await getTokenFromCookie();
  const api = createApi(token);

  try {
    const response = await api.get(`/api/adopts/metrics`);
    return response.data.data;

  } catch (error: any) {
    console.error(error.response?.data);
    return null;
  }
}

function convertDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

export default async function DashboardPage() {
  const data: AdoptionMetrics = await getData();

  return (
    <Container>
      <main className="max-w-screen-xl mx-auto py-6">
        <HeaderDashboard />

        <section>
          <h2 className="text-xl sm:text-2xl text-neutral-700 font-normal">Acesso rápido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
            <Link href="/pets" className="shadow-md rounded-sm px-4 py-8 flex items-center gap-2 border border-green-300">
              <FaShareFromSquare className="text-green-600" size={28} />
              <p className="text-blue-500">Ver Pets disponíveis</p>
            </Link>

            <Link href="/adoptions" className="shadow-md rounded-sm px-4 py-8 flex items-center gap-2 border border-blue-300">
              <FaShareFromSquare className="text-blue-600" size={28} />
              <p className="text-blue-500">Ver Pets adotados</p>
            </Link>

            <Link href="/profile" className="shadow-md rounded-sm px-4 py-8 flex items-center gap-2 border border-yellow-300">
              <FaShareFromSquare className="text-yellow-600" size={28} />
              <p className="text-blue-500">Gerenciar meu perfil</p>
            </Link>

            <Link href="/pets/me" className="shadow-md rounded-sm px-4 py-8 flex items-center gap-2 border border-red-300">
              <FaShareFromSquare className="text-red-600" size={28} />
              <p className="text-blue-500">Meus Pets</p>
            </Link>
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
              <span className="text-2xl text-gray-600">{data.meta.adoption_count}</span>
            </div>
            <div className="shadow-md rounded-sm px-4 py-8 flex items-center justify-between gap-2 bg-blue-100 border border-blue-300">
              <div>
                <FaShareAlt className="text-blue-600" size={28} />
                <p className="text-gray-600 text-lg font-semibold">Adoções pendentes: </p>
              </div>
              <span className="text-2xl text-gray-600">{data.meta.visit_count}</span>
            </div>
            <div className="shadow-md rounded-sm px-4 py-8 flex items-center justify-between gap-2 bg-yellow-100 border border-yellow-300">
              <div>
                <FaBook className="text-yellow-600" size={28} />
                <p className="text-gray-600 text-lg font-semibold">Visitas agendadas: </p>
              </div>
              <span className="text-2xl text-gray-500">{data.meta.visit_scheduled_count}</span>
            </div>
          </div>
        </section>

        <section className="overflow-x-auto mt-8">
          <h2 className="text-xl sm:text-2xl text-neutral-700 font-normal mb-4">Ultimas adoções</h2>

          <div className="max-w-screen-xl mx-auto py-6">
            {data.adoptions.length === 0 && (
              <p className="text-gray-600">Não há nenhuma adoação.</p>
            )}
          </div>

          {data.adoptions.length > 0 && (
            <div>
              <table className="table-none sm:table-auto border-separate border border-gray-400 w-full">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Nome do Pet</th>
                    <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Quem Adotou</th>
                    <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Telefone</th>
                    <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Data da adoção</th>
                  </tr>
                </thead>
                <tbody>
                  {data.adoptions.map((adopt: AdoptProps, index: number) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className="text-gray-800">{adopt?.pet?.name}</span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{adopt?.adopter?.first_name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{adopt?.adopter?.details?.phone}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{convertDate(adopt.adopt_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </main>
    </Container>
  );
}