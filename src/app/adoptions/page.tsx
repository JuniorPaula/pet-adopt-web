import { Container } from "@/components/container";
import { createApi } from "@/services/axios-service";
import { getTokenFromCookie } from "@/services/get-token-from-cookie";

async function getAdoptions() {
  const token = await getTokenFromCookie();
    const api = createApi(token);
  
  try {
    const response = await api.get(`/api/adopts`);
    console.log(response.data.data);
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

      <div>
        { adopts.length === 0 && (
          <div className="max-w-screen-xl mx-auto py-6">
            <p className="text-gray-600">Você ainda não adotou nenhum pet.</p>
          </div>
        )}

        { adopts.length > 0 && (
          <table className="table-auto border-separate border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Pet</th>
                <th className="border border-gray-300 px-4 py-2">Origem</th>
                <th className="border border-gray-300 px-4 py-2">Data da adoção</th>
              </tr>
            </thead>
            <tbody>
              { adopts.map((adopt: any, index: number) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{adopt.pet.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{adopt.old_owner.first_name} {adopt.old_owner?.last_name ?? ''}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{convertDate(adopt.adopt_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </Container>
  );
}