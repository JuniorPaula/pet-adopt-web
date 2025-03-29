import { Container } from "@/components/container";
import { createApi } from "@/services/axios-service";
import { getTokenFromCookie } from "@/services/get-token-from-cookie";
import { VisitProps } from "@/types/visit.type";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

enum VisitStatus {
  Completed = "completed",
  Pending = "pending",
  Canceled = "canceled"
}

async function getVisits(): Promise<VisitProps[] | null> {
  const token = await getTokenFromCookie();
  const api = createApi(token);
  
  try {
    const response = await api.get(`/api/visits`);
    return response.data.data;

  } catch (error: any) {
    console.error(error.response?.data);
    return null;
  }
}

export default async function VisitsPage() {
  const visits = await getVisits();

  return (
    <Container>
      <div className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl font-medium text-neutral-700">Minhas visitas agendadas</h1>
        <p className="text-gray-600 mt-2">Aqui você pode acompanhar as visitas que você agendou.</p>
      </div>

      <div className="max-w-screen-xl mx-auto py-6">
        { visits && visits.length === 0 && (
          <p className="text-gray-600">Você ainda não agendou nenhuma visita.</p>
        )}
      </div>

      <section className="overflow-x-auto">

        { visits && visits.length > 0 && (
          <table className="table-auto border-separate border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Pet</th>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Tutor</th>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Telefone do tutor</th>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              { visits.map((visit, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 text-blue-500">
                    <Link href={`/pets/${visit.pet.id}`}>
                        {visit.pet.name}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{visit.pet.owner.first_name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex items-center gap-2">
                      <FaWhatsapp className="inline-block mr-1 text-green-500" size={24} />
                      <a href={`https://wa.me/${visit.pet.owner?.details?.phone}`}
                      className="text-gray-900 hover:text-blue-600"
                        target="_blank" rel="noopener noreferrer">
                        { visit.pet.owner?.details?.phone }
                      </a>
                    </div>
                  </td>
                  <td className={`border border-gray-300 px-4 py-2 text-center ${
                    visit.status === VisitStatus.Completed ? 'text-green-500' :
                    visit.status === VisitStatus.Pending ? 'text-yellow-500' :
                    visit.status === VisitStatus.Canceled ? 'text-red-500' : ''
                  }`}>
                    {
                      visit.status === VisitStatus.Completed ? 'Adoção Concluída' :
                      visit.status === VisitStatus.Pending ? 'Aguardando confirmação' :
                      visit.status === VisitStatus.Canceled ? 'Cancelada' : ''
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </Container>
  );
}