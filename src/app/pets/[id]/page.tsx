import { createApi } from "@/services/axios-service";
import { Container } from "@/components/container";
import { PetProps } from "@/types/pet.type";
import { PetDetails } from "../components/pet-details";
import { getTokenFromCookie } from "@/services/get-token-from-cookie";
import Link from "next/link";

async function getPet(id: string): Promise<PetProps | null> {
  const token = await getTokenFromCookie();
  const api = createApi(token);

  try {
    const response = await api.get(`/api/pets/${id}`);
    return response.data.data;
  }
  catch (error: any) {
    console.error(error.response?.data);
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
      <div className="flex flex-col items-center justify-center bg-gray-100" style={{ height: "calc(100vh - 80px)" }}>
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-8">Oops! Página não encontrada.</p>
        <div className="flex gap-4">

        <Link href="/pets">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
            Voltar
          </button>
        </Link>
      </div>
      </div>
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