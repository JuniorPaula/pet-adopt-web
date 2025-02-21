import { createApi } from "@/services/axios-service";
import { Container } from "@/components/container";
import { PetProps } from "@/types/pet.type";
import { PetDetails } from "../components/pet-details";

async function getPet(id: string): Promise<PetProps | null> {
  const api = await createApi();

  try {
    const response = await api.get(`/api/pets/${id}`);
    return response.data.data;
  }
  catch (error: any) {
    console.error(error.response);
    return null;
  }
}

export default async function PetPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const pet = await getPet(id);
  
  if (!pet) {
    return (
      <h1>Pet não encontrado</h1>
    );
  }

  return (
    <Container>
      <main className="w-full mx-auto mt-7 mb-4">
        <h4 className="text-slate-600 text-md mb-9">Aqui você pode conhecer melhor seu futuro melhor aumigo!
          <br /> E visualizar dados de contato do seu Tutor,
          <br /> Além de poder agendar uma visita para conhecer melhor o(a) <strong className="text-lg text-slate-800">{pet.name}.</strong>
        </h4>

        <PetDetails {...pet} />
      </main>
    </Container>
  );
};