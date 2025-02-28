"use client";

import { VisitProps } from "@/types/visit.type";

export function CardDetals(visit: VisitProps) {

  return (
    <div className="max-w-screen-xl mx-auto py-6">
      <div className="bg-slate-100 shadow-md p-6">
        <h2 className="text-xl font-medium text-neutral-700 sm:text-lg">Detalhes da visita</h2>
        <p className="text-gray-600 mt-2">Confirme os detalhes da visita abaixo:</p>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-neutral-700">Pet</span>
            <span className="text-lg text-blue-500">{ visit.pet.name }</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-medium text-neutral-700">Interessado</span>
            <span className="text-lg">{ visit.user.first_name} { visit.user.last_name ?? '' }</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-medium text-neutral-700">Celular</span>
            <span className="text-lg">55 47 993454323</span>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-green-500 text-white py-2 px-4 rounded-sm hover:bg-green-600 transition-colors mb-2 mr-2">
            Confirmar visita
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded-sm hover:bg-red-600 transition-colors">
            Cancelar visita
          </button>
        </div>
      </div>
    </div>
  );
}