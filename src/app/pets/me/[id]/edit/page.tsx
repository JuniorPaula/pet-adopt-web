"use client"

import React from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { Container } from '@/components/container'
import { useParams } from "next/navigation";
import { createApi } from "@/services/axios-service";
import { PetProps } from "@/types/pet.type";
import { toast } from "react-toastify";

export default function EditPetPage() {
  const { id: petId } = useParams<{ id: string }>();
  const [pet, setPet] = React.useState<PetProps>();

  React.useEffect(() => {
    const getPet = async (id: string) => {
      const token = Cookies.get("authToken")
      const api = createApi(token);

      const response = await api.get(`api/pets/${id}/me`);
      const data = response.data;

      if (!data.error) {
        setPet(data.data);
      }
    }

    getPet(petId)
  }, [petId]);

  const handleRemoveImage = async (index: number) => {
    const fullPath = pet?.images[index];
    const path = fullPath?.split("/").pop()?.split("-").pop()?.split(".")[0];
    console.log(path);

    const token = Cookies.get("authToken")
    const api = createApi(token);

    try {
      const response = await api.delete(`api/pets/${petId}/images/${path}`);
      if (response.data.error) {
        toast.error("Erro ao remover imagem");
        console.error(response.data.message);
        return;
      }

      setPet(pet ? { ...pet, images: pet.images.filter((_, i) => i !== index) } : undefined);
      toast.success("Imagem removida com sucesso!");
    } catch (error) {
      toast.error("Erro interno do servidor")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: pet?.name,
      age: pet?.age,
      weight: pet?.weight,
      size: pet?.size,
      color: pet?.color,
      description: pet?.description,
    }

    const token = Cookies.get("authToken")
    const api = createApi(token);

    try {
      const response = await api.put(`api/pets/${petId}`, payload);
      if (response.data.error) {
        console.error(response.data.message);
        return;
      }

      toast.success("Pet atualizado com sucesso!");
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar pet");
    }
  }

  return (
    <Container>
      <div className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl font-medium text-neutral-700">Editar Pet</h1>
        <p className="text-gray-600 mt-2">Aqui você pode editar os dados do seu pet.</p>
      </div>
      
      {/* Images */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {pet && pet.images.map((path, index) => (
          <div key={index} className="relative border p-2">
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${path}`}
              alt={`Preview ${index}`}
              className="w-full h-32 object-cover"
            />
          </div>
        ))}
      </div>

      <div className="max-w-screen-xl mx-auto py-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                value={pet?.name ?? ""}
                onChange={(e) => setPet(pet ? { ...pet, name: e.target.value } : undefined)}
                className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Idade</label>
              <input
                type="text"
                id="age"
                value={pet?.age ?? ""}
                onChange={(e) => setPet(pet ? { ...pet, age: e.target.value } : undefined)}
                className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso</label>
              <input
                type="text"
                id="weight"
                value={pet?.weight ?? ""}
                onChange={(e) => setPet(pet ? { ...pet, weight: e.target.value } : undefined)}
                className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">Porte</label>
              <select
                id="size"
                className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                value={pet?.size || ""}
                onChange={(e) => setPet(pet ? { ...pet, size: e.target.value } : undefined)}
              >
                <option value="P">Pequeno</option>
                <option value="M">Médio</option>
                <option value="G">Grande</option>
              </select>
            </div>
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">Cor</label>
              <input
                type="text"
                id="color"
                value={pet?.color ?? ""}
                onChange={(e) => setPet(pet ? { ...pet, color: e.target.value } : undefined)}
                className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              id="description"
              maxLength={1000}
              value={pet?.description ?? ""}
              onChange={(e) => setPet(pet ? { ...pet, description: e.target.value } : undefined)}
              rows={5}
              style={{ resize: "none" }}
              className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
            ></textarea>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
                shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-blue-500"
            >
              Editar
            </button>
            <Link href="/pets/me"
              className="inline-flex items-center px-4 py-2 ml-2 border border-transparent text-sm font-medium rounded-md
              shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-gray-500"
            >
              Voltar
            </Link>
          </div>
        </form>
      </div>
    </Container>
  )
}