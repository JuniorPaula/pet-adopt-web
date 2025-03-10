"use client"

import { createApi } from "@/services/axios-service";
import { getTokenFromCookie } from "@/services/get-token-from-cookie";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa"
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface RemovePetProps {
  petId: number;
}

export function RemovePet({ petId }: RemovePetProps) {
  const router = useRouter();

  const showSwalRemovePet = () => {
    withReactContent(Swal).fire({
      title: 'Remover',
      text: `Deseja remover o pet?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      preConfirm: async () => {
        console.log('Remove pet', petId)

        const token = await getTokenFromCookie();
        const api = createApi(token);

        try {
          const response = await api.delete(`/api/pets/${petId}`);
          if (response.data.error) {
            toast.error("Erro ao remover pet");
            return;
          }
          toast.success(`Pet removido com sucesso`);
          router.refresh();
        } catch (error: any) {
          console.error(error.response?.data);
          toast.error("Erro interno do servidor");
        }
      },
    })
  }

  return (
    <FaTrash onClick={ showSwalRemovePet } className="text-red-500 cursor-pointer ml-2" size={20} />
  )
}