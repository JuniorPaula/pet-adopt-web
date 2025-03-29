"use client";

import { useEffect, useState } from "react";
import { createApi } from "@/services/axios-service";
import { getTokenFromCookie } from "@/services/get-token-from-cookie";
import { VisitProps } from "@/types/visit.type";
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaWhatsapp } from "react-icons/fa";

export function CardDetals(visit: VisitProps) {

  const [visitStatus, setVisitStatus] = useState(visit.status);

  useEffect(() => {
    setVisitStatus(visit.status);
  }, [visit.status]);

  const showSwalConfirmAdoption = () => {
    withReactContent(Swal).fire({
      title: 'Confirmação',
      text: `Deseja confirmar a adoção?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      preConfirm: async () => {
        const token = await getTokenFromCookie();
        const api = createApi(token);

        try {
          const response = await api.post(`/api/pets/${visit.pet.id}/adopt`);

          toast.success(`Adoção confirmada com sucesso`);
          setVisitStatus('completed');
          return response.data.data;
        } catch (error: any) {
          console.error(error.response?.data);
          toast.error(`Erro ao confirmar adoção`);
        }
      },
    })
  }

  const showSwalCancelAdoption = () => {
    withReactContent(Swal).fire({
      title: 'Cancelamento',
      text: `Deseja cancelar a adoção?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      preConfirm: async () => {
        const token = await getTokenFromCookie();
        const api = createApi(token);

        try {
          const response = await api.patch(`/api/visits/${visit.id}/status`, {
            status: 'canceled'
          });

          toast.success(`Adoção cancelada com sucesso`);
          setVisitStatus('canceled');
          return response.data.data;
        } catch (error: any) {
          console.error(error.response?.data);
          toast.error(`Erro ao cancelar adoção`);
        }
      },
    })
  }

  return (

    (visitStatus !== 'completed' && visitStatus !== 'canceled') &&
    <div className="max-w-screen-xl mx-auto py-6">
      <div className="bg-slate-100 shadow-md p-6">
        <h2 className="text-xl font-medium text-neutral-700 sm:text-lg">Detalhes da visita</h2>
        <p className="text-gray-600 mt-2">Confirme os detalhes da visita abaixo:</p>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-neutral-700">Pet</span>
            <span className="text-lg text-blue-500">{visit.pet.name}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-medium text-neutral-700">Interessado</span>
            <span className="text-lg">{visit.user.first_name} {visit.user.last_name ?? ''}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-medium text-neutral-700">Celular</span>
            <span className="text-lg">
              <div className="flex items-center gap-2">
                <FaWhatsapp className="inline-block mr-1 text-green-500" size={24} />
                <a href={`https://wa.me/${visit.user?.details?.phone}`}
                className="text-gray-900 hover:text-blue-600"
                  target="_blank" rel="noopener noreferrer">
                  { visit.user?.details?.phone }
                </a>
              </div>
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button onClick={ showSwalConfirmAdoption } className="bg-green-500 text-white py-2 px-4 rounded-sm hover:bg-green-600 transition-colors mb-2 mr-2">
            Confirmar adoção
          </button>
          <button onClick={ showSwalCancelAdoption } className="bg-red-500 text-white py-2 px-4 rounded-sm hover:bg-red-600 transition-colors">
            Cancelar adoção
          </button>
        </div>
      </div>
    </div>
  );
}