import { Container } from "@/components/container";
import { PetsList } from "./components/pets-list";

export default async function PetsPage() {

  return (
    <Container>
      <main className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl sm:text-3xl text-neutral-700 font-bold">Pets disponíveis para adoção</h1>
        <p className="py-2 text-gray-600">Veja os detalhes de cada um e conheça o Tutor dessas fofuras.</p>

        <PetsList />
      </main>
    </Container>
  );
}