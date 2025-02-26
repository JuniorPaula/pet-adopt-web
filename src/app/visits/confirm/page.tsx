import { Container } from "@/components/container";

export default function ConfirmVisitPage() {
  return (
    <Container>
      <div className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl font-medium text-neutral-700">Confirmação de visita</h1>
        <p className="text-gray-600 mt-2">
          Aqui você pode conferir quem está solicitando uma visita para conhecer o Pet que está para Adoção
        </p>
        <p className="text-gray-600">
          Você pode confirmar ou cancelar a visita, ou até melhor,
          entra em contato com quem tem enteresse em fazer mais um cãozinho feliz.
        </p>
      </div>

      <div className="max-w-screen-xl mx-auto py-6">
        <div className="bg-slate-100 shadow-md p-6">
          <h2 className="text-xl font-medium text-neutral-700">Detalhes da visita</h2>
          <p className="text-gray-600 mt-2">Confirme os detalhes da visita abaixo:</p>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-neutral-700">Pet</span>
              <span className="text-lg text-blue-500">Rex</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-medium text-neutral-700">Enteressado</span>
              <span className="text-lg">João da Silva</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-medium text-neutral-700">Celular</span>
              <span className="text-lg">55 47 993454323</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-green-500 text-white py-2 px-4 rounded-sm hover:bg-green-600 transition-colors">Confirmar visita</button>
            <button className="bg-red-500 text-white py-2 px-4 rounded-sm ml-2 hover:bg-red-600 transition-colors">Cancelar visita</button>
          </div>
        </div>
      </div>
    </Container>
  );
}