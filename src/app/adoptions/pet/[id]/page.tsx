import { Container } from "@/components/container";
import { createApi } from "@/services/axios-service";
import { getTokenFromCookie } from "@/services/get-token-from-cookie";
import { AdoptProps } from "@/types/adopt.type";
import Image from "next/image";

const defaultImage = "/assets/no-image.png";

async function getAdoptionDetails(id: number) {
  const token = await getTokenFromCookie();
  const api = createApi(token);

  try {
    const response = await api.get(`/api/adopts/pet/${id}`);
    return response.data.data;
  }
  catch (error: any) {
    console.error(error.response?.data);
    return null;
  }
}

export default async function AdoptionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const adoption: AdoptProps = await getAdoptionDetails(Number(id));

  return (
    <Container>
        <h1 className="text-2xl mt-4">Detalhes da adoção</h1>
        <p className="text-slate-700">Aqui você pode ver os detalhes da adoção do pet.</p>
        <div className="max-w-screen-xl mx-auto py-6 flex">
          <div>
            <Image
              src={adoption.pet?.images?.[0] ? `${process.env.NEXT_PUBLIC_API_URL}${adoption.pet.images[0]}` : defaultImage}
              alt={adoption.pet.name}
              className="object-cover border-2 border-gray-200"
              width={400}
              height={650}
            />
          </div>
          <div className="flex flex-col ml-4">
            <div>
              <h2 className="text-lg text-neutral-700 font-bold">Detalhes do pet</h2>
              <h2 className="text-lg text-neutral-700 font-bold">{adoption.pet.name}</h2>
              <p className="text-gray-600 text-sm">Idade: {adoption.pet.age} ano(s)</p>
              <p className="text-gray-600 text-sm">Peso: {adoption.pet.weight} Kg</p>
              <p className="text-gray-600 text-sm">Porte: {adoption.pet.size}</p>
              <p className="text-gray-600 text-sm">Cor: {adoption.pet.color}</p>
            </div>

            <div className="mt-4">
              <h2 className="text-lg text-neutral-700 font-bold">Detalhes do antigo tutor</h2>
              <p className="text-gray-600 text-sm">Nome: {adoption.old_owner.first_name} {adoption.old_owner?.last_name ?? ''}</p>
              <p className="text-gray-600 text-sm">Email: {adoption.old_owner.email}</p>
              <p className="text-gray-600 text-sm">Telefone: 47 9999999999</p>
            </div>
          </div>
        </div>
    </Container>
  );
}