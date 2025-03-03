import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function MyPetsPage() {
  return (
    <Container>
      <div className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl font-medium text-neutral-700">Meus pets</h1>
        <p className="text-gray-600 mt-2">Aqui você pode ver os pets que você cadastrou. Gerênciar e atualizar as informações deles.</p>
      </div>

      <table className="table-auto border-separate border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">#</th>
            <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Nome</th>
            <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Idade</th>
            <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Peso</th>
            <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Porte</th>
            <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Cor</th>
            <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Disponível</th>
            <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 flex justify-center">
              <Image
                src={`/assets/no-image.png`}
                alt="Foto de Rex"
                width={50}
                height={50}
                className="rounded-full"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2 text-blue-500">
              <Link href={`/pets/1`}>
                Rex
              </Link>
            </td>
            <td className="border border-gray-300 px-4 py-2">2 ano(s)</td>
            <td className="border border-gray-300 px-4 py-2 text-center">10 Kg</td>
            <td className="border border-gray-300 px-4 py-2 text-center">Pequeno</td>
            <td className="border border-gray-300 px-4 py-2 text-center">Marrom</td>
            <td className="border border-gray-300 px-4 py-2 text-center">Sim</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <div className="flex justify-center">
                <Link href={`/pets/1/edit`}>
                  <FaEdit className="text-blue-500 cursor-pointer" size={20} />
                </Link>
                <FaTrash className="text-red-500 cursor-pointer ml-2" size={20} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}