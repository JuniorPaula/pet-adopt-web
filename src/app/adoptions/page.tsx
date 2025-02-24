import { Container } from "@/components/container";

const adoptios = [
  {
    pet: "Cachorro 1",
    old_owner: "João",
    adopt_date: "2021-10-10",
  },
  {
    pet: "Cachorro 2",
    old_owner: "Maria",
    adopt_date: "2021-10-10",
  },
  {
    pet: "Cachorro 3",
    old_owner: "José",
    adopt_date: "2021-10-10",
  },
]

export default function AdoptionsPage() {
  return (
    <Container>
      <div className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl font-medium text-neutral-700">Minhas adoções</h1>
        <p className="text-gray-600 mt-2">Aqui você pode ver os pets que você adotou e seus status de adoção.</p>
      </div>

      <div>
        { adoptios.length === 0 && (
          <div className="max-w-screen-xl mx-auto py-6">
            <p className="text-gray-600">Você ainda não adotou nenhum pet.</p>
          </div>
        )}

        { adoptios.length > 0 && (
          <table className="table-auto border-separate border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Pet</th>
                <th className="border border-gray-300 px-4 py-2">Origem</th>
                <th className="border border-gray-300 px-4 py-2">Data da adoção</th>
              </tr>
            </thead>
            <tbody>
              { adoptios.map((adoption, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{adoption.pet}</td>
                  <td className="border border-gray-300 px-4 py-2">{adoption.old_owner}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{adoption.adopt_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </Container>
  );
}