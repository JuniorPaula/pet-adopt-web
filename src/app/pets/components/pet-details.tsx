"use client";

import Image from "next/image"
import Cookies from "js-cookie";
import { PetProps } from "@/types/pet.type"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react";
import { createApi } from "@/services/axios-service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export function PetDetails(pet: PetProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ visitScheduled, setVisitScheduled ] = useState<boolean>(false)
  const router = useRouter();

  const handleScheduleVisit = async () => {
    const token = Cookies.get("authToken")
    if (!token) {
      toast.error("Ops! Você precisa estar logado para agendar uma visita.")
      return
    }

    if (!pet.id) {
      toast.error("Ops! Ocorreu um erro ao agendar a visita.")
      return
    }

    const api = createApi(token)
    try {
      const response = await api.post(`/api/pets/${pet.id}/scheduler`, {
        owner_id: pet.owner.id,
      })

      if (response.data.error) {
        toast.error(response.data.message)
        return
      }

      toast.success("Visita agendada com sucesso!")
      setVisitScheduled(true)
    }
    catch (error: any) {
      console.error(error.response)
      toast.error("Ops! Ocorreu um erro ao agendar a visita.")
    }
  }

  useEffect(() => {
    const getVisitSchedule = async () => {
      const token = Cookies.get("authToken")
      if (!token) {
        return
      }

      const api = createApi(token)
      try {
        const response = await api.get(`/api/pets/${pet.id}/scheduler`)
        if (!response.data.error) {
          if (response?.data?.data?.status === "pending") {
            setVisitScheduled(true)
          } else if (response?.data?.data?.status === "completed") {
            // redirect to adopt page
            router.push(`/adoptions/pet/${pet.id}`)
          }
        }
      }
      catch (error: any) {
        console.error("ERRO::", error)
        toast.error("Ops! Ocorreu um erro ao buscar a agenda de visitas.")
      }
    }

    getVisitSchedule()
  }, [pet])

  return (
    <section>
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pet?.images?.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${img}`}
          alt={`Foto de ${pet.name}`}
          width={300}
          height={200}
          className="w-full h-40 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-7 py-2">
        {/* Lado Esquerdo - Informações do Pet */}
        <div className="pr-5">
          <h2 className="text-3xl text-slate-800 mb-4">{pet.name}</h2>
          <p className="text-gray-700 mb-2"><strong>Port:</strong> {pet.size}</p>
          <p className="text-gray-700 mb-2"><strong>Idade:</strong> {pet.age} Anos</p>
          <p className="text-gray-700 mb-4"><strong>Peso:</strong> {pet.weight} kg</p>

          <br />

          <h3 className="mb-2 text-lg text-slate-800">Dados do Tutor:</h3>
          <p className="text-gray-700 mb-2"><strong>Nome:</strong> James foo</p>
          <p className="text-gray-700 mb-2"><strong>Telefone:</strong> +55 47 991678787</p>

          <button 
            className={`w-full mb-4 mt-2 text-white p-2 ${
              visitScheduled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={ handleScheduleVisit }
            disabled={ visitScheduled }
          >
            { visitScheduled ? "Visita agendada" : "Agendar uma visita" }
          </button>
        </div>

        {/* Lado Direito - Descrição */}
        <div className="pl-6">
          <h3 className="text-slate-800 text-2xl mb-2">Uma breve descrição</h3>
          <p className="text-gray-700 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${selectedImage}`}
                alt="Imagem ampliada"
                width={800}
                height={600}
                className="rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 font-bold text-red-500 bg-transparent"
              >
                X
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}