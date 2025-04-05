import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { FaEdit } from "react-icons/fa";
import { getTokenFromCookie } from "@/services/get-token-from-cookie";
import { createApi } from "@/services/axios-service";
import { PetProps } from "@/types/pet.type";

import { RemovePet } from "../components/remove-pet";

async function getMyPets() {
  const token = await getTokenFromCookie();
  const api = createApi(token);

  try {
    const response = await api.get(`api/pets/me`);
    return response.data.data;

  } catch (error: any) {
    console.error(error.response?.data);
    return null;
  }
}

export default async function MyPetsPage() {
  const data: PetProps[] = await getMyPets();

  return (
    <Container>
      <div className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl font-medium text-neutral-700">Meus pets</h1>
        <p className="text-gray-600 mt-2">
            Aqui você pode ver os pets que você cadastrou. Gerênciar e atualizar as informações deles.
        </p>
      </div>

      <div className="max-w-screen-xl flex justify-end mx-auto">
        <button
            className="bg-blue-600 py-2 px-3 text-white rounded-sm hover:bg-blue-700 transition-colors
             duration-200"
        >
          <Link href="/pets/me/new">Cadastrar novo pet</Link>
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto py-6">
        {data && data.length === 0 && (
          <p className="text-gray-600">Você ainda não cadastrou nenhum pet.</p>
        )}
      </div>

      <section className="overflow-x-auto">

        {data && data.length > 0 && (
          <table className="table-none sm:tab</div>le-auto border-separate border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Foto</th>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Nome</th>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Idade</th>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Peso</th>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Porte</th>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Cor</th>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Status</th>
                <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((pet, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    <Image
                      src={pet?.images?.[0] ? `${process.env.NEXT_PUBLIC_API_URL}${pet.images[0]}` : `/assets/no-image.png`}
                      alt={`Foto do pet, nome: ${pet.name}`}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {pet.available ? (
                      <Link href={`/pets/me/${pet.id}/edit`} className="text-blue-500">
                        {pet.name}
                      </Link>

                    ) : (
                      <span className="text-gray-800">{pet.name}</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{pet.age}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{pet.weight}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{pet.size}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{pet.color}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {pet.available ? (
                      <span className="bg-green-500 p-1 rounded-md text-sm text-white">Disponível</span>
                    ) : (
                      <span className="bg-gray-400 p-1 rounded-md text-sm text-white">Adotado</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center">
                      {pet.available ? (
                        <>
                          <Link href={`/pets/me/${pet.id}/edit`}>
                            <FaEdit className="text-blue-500 cursor-pointer" size={20} />
                          </Link>
                          <RemovePet petId={pet.id} />
                        </>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </Container>
  )
}