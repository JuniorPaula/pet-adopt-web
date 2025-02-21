import { Container } from "@/components/container";
import { PetProps } from "@/types/pet.type";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const defaultImage = "/assets/no-image.png";

async function getPets() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`, {
    next: { revalidate: 320 }
  });

  const data = await response.json();

  if (data.error) {
    redirect("/");
  }

  return data.data;
}

export default async function PetsPage() {
  const pets: PetProps[] = await getPets();

  return (
    <Container>
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <h1 className="text-2xl sm:text-3xl text-neutral-700 font-bold">Pets disponíveis para adoção</h1>
        <p className="py-2 text-gray-600">Veja os detalhes de cada um e conheça o Tutor dessas fofuras.</p>

        <section className="grid gap-7 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pets.map((pet: any) => (
            <div key={pet.id} className="bg-white py-4">
              <div className="relative w-full h-48 hover:transform hover:scale-105 transition-all duration-300">
                <Image
                  src={pet?.images?.[0] ? `${process.env.NEXT_PUBLIC_API_URL}${pet.images[0]}` : defaultImage}
                  alt={pet.name} 
                  className="object-cover border-2 border-gray-200"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
                />
              </div>

              <div className="flex flex-col mt-4 items-start justify-center">
                <h2 className="text-lg text-neutral-700 font-bold mt-4">{pet.name}</h2>
                <p className="text-gray-600 text-sm">Idade: {pet.age} ano(s)</p>
                <p className="text-gray-600 text-sm">Peso: {pet.weight} Kg</p>
                <p className="text-gray-600 text-sm">Porte: {pet.size}</p>
                <p className="text-gray-600 text-sm">Cor: {pet.color}</p>

                { pet.available ? (
                  <Link href={`/pets/${pet.id}`} className="w-full">
                    <button
                      className="px-4 py-2 mt-4 w-full bg-blue-500 text-white hover:bg-blue-400 transition-all duration-300"
                    >
                      Conhecer
                    </button>
                  </Link>
                ) : (
                  <button
                    className="px-4 py-2 mt-4 w-full bg-gray-400 text-gray-700 cursor-not-allowed"
                    disabled
                  >
                    Indisponível
                  </button>
                )}
              </div>

            </div>
          ))}
        </section>
      </main>
    </Container>
  );
}