import Link from "next/link";
import { Container } from "@/components/container";
import { createApi } from "@/services/axios-service";
import { getTokenFromCookie } from "@/services/get-token-from-cookie";
import { FaEye } from "react-icons/fa";

async function getAdoptions() {
  const token = await getTokenFromCookie();
    const api = createApi(token);
  
  try {
    const response = await api.get(`/api/adopts`);
    return response.data.data;
  }
  catch (error: any) {
    console.error(error.response?.data);
    return null;
  }
}

function convertDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

export default async function AdoptionsPage() {
  const adopts = await getAdoptions();

  return (
    <Container>
      <div className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl font-medium text-neutral-700">Minhas adoções</h1>
        <p className="text-gray-600 mt-2">Aqui você pode ver os pets que você adotou.</p>
      </div>

      <div className="max-w-screen-xl mx-auto py-6">
        { adopts.length === 0 && (
          <p className="text-gray-600">Você ainda não adotou nenhum pet.</p>
        )}
      </div>

      <section className="overflow-x-auto">

        { adopts.length > 0 && (
          <table className="table-auto border-separate border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 font-medium bg-gray-200 px-4 py-2">Pet</th>
                <th className="border border-gray-300 font-medium bg-gray-200 px-4 py-2">Origem</th>
                <th className="border border-gray-300 font-medium bg-gray-200 px-4 py-2">Data da adoção</th>
                <th className="border border-gray-300 font-medium bg-gray-200 px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              { adopts.map((adopt: any, index: number) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{adopt.pet.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{adopt.old_owner.first_name} {adopt.old_owner?.last_name ?? ''}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{convertDate(adopt.adopt_date)}</td>
                    <td className="border border-gray-300 px-4 py-2 sm:flex sm:justify-center">
                    <Link href={`/adoptions/pet/${adopt.pet.id}`}>
                      <FaEye className="text-blue-700 cursor-pointer" size={24} />
                    </Link>
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