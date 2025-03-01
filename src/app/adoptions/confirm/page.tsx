import { Container } from "@/components/container";
import { CardDetals } from "../components/card-details";
import { getTokenFromCookie } from "@/services/get-token-from-cookie";
import { createApi } from "@/services/axios-service";
import { VisitProps } from "@/types/visit.type";

async function getVisits() {
  const token = await getTokenFromCookie();
  const api = createApi(token);
  
  try {
    const response = await api.get(`/api/visits/owner`);
    return response.data.data;

  } catch (error: any) {
    console.error(error.response?.data);
    return null;
  }
}

export default async function ConfirmAdoptPage() {
  const visits: VisitProps[] = await getVisits();

  return (
    <Container>
      <div className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl font-medium text-neutral-700">Confirmação de Adoção</h1>
        <p className="text-gray-600 mt-2">
          Aqui você pode conferir quem solicitou uma visita e pretende conhecer melhor o Pet para uma futura Adoção.
        </p>
        <p className="text-gray-600">
          Caso ocorra tudo certo, você pode confirmar ou cancelar a adoção, ou até melhor,<br />
          antes disso você pode entra em contato com quem tem interesse em fazer mais um cãozinho feliz.
        </p>
      </div>

    { visits && visits.length === 0 && (
      <div className="max-w-screen-xl mx-auto py-6">
        <p className="text-gray-600">Não há adoção para confirmar.</p>
      </div>
    )}

    { visits && visits.length > 0 && (
      <div className="max-w-screen-xl mx-auto py-6">
          {visits.map((visit, index) => (
            <CardDetals key={index} {...visit} />
          ))}
      </div>
    )}
    </Container>
  );
}