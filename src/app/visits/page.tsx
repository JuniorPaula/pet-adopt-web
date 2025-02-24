import { Container } from "@/components/container";

const visits = [
  {
    pet: "Bob",
    onwe_pet: "João",
    visit_date: "2021-10-10",
    status: "completed"
  },
  {
    pet: "Bob",
    onwe_pet: "João",
    visit_date: "2021-10-10",
    status: "pending"
  },
  {
    pet: "Bob",
    onwe_pet: "João",
    visit_date: "2021-10-10",
    status: "pending"
  },
  {
    pet: "Bob",
    onwe_pet: "João",
    visit_date: "2021-10-10",
    status: "canceled"
  },
]

enum VisitStatus {
  Completed = "completed",
  Pending = "pending",
  Canceled = "canceled"
}

export default function VisitsPage() {
  return (
    <Container>
      <div className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl font-medium text-neutral-700">Minhas visitas agendadas</h1>
        <p className="text-gray-600 mt-2">Aqui você pode acompanhar as visitas que você agendou.</p>
      </div>

      <div>
        { visits.length === 0 && (
          <div className="max-w-screen-xl mx-auto py-6">
            <p className="text-gray-600">Você ainda não agendou nenhuma visita.</p>
          </div>
        )}

        { visits.length > 0 && (
          <table className="table-auto border-separate border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Pet</th>
                <th className="border border-gray-300 px-4 py-2">Tutor</th>
                <th className="border border-gray-300 px-4 py-2">Data da visita</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              { visits.map((visit, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{visit.pet}</td>
                  <td className="border border-gray-300 px-4 py-2">{visit.onwe_pet}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{visit.visit_date}</td>
                  <td className={`border border-gray-300 px-4 py-2 text-center ${
                    visit.status === VisitStatus.Completed ? 'text-green-500' :
                    visit.status === VisitStatus.Pending ? 'text-yellow-500' :
                    visit.status === VisitStatus.Canceled ? 'text-red-500' : ''
                  }`}>
                    {
                      visit.status === VisitStatus.Completed ? 'Concluída' :
                      visit.status === VisitStatus.Pending ? 'Aguardando confirmação' :
                      visit.status === VisitStatus.Canceled ? 'Cancelada' : ''
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
}