"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { Container } from "@/components/container";
import { createApi } from "@/services/axios-service";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface CreatePetFormData {
  name: string;
  age: string;
  weight: string;
  size: string;
  color: string;
  images: FileList;
}

export default function CreatePet() {
  const MAX_IMAGES = 12;

  const { register, handleSubmit, formState: { errors } } = useForm<CreatePetFormData>();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [alertMaxImages, setAlertMaxImages] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length > MAX_IMAGES) {
      setAlertMaxImages(true);

      setTimeout(() => { setAlertMaxImages(false) }, 5000);
    }

    const totalFiles = [...files, ...selectedFiles].slice(0, MAX_IMAGES);

    previews.forEach((preview) => URL.revokeObjectURL(preview));

    setFiles(selectedFiles);

    const selectedPreviews = totalFiles.map((files) => URL.createObjectURL(files));
    setPreviews(selectedPreviews);
  }

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previews];

    updatedFiles.splice(index, 1);
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const onSubmit = async (data: CreatePetFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("weight", data.weight);
    formData.append("size", data.size);
    formData.append("color", data.color);

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const token = Cookies.get("authToken")
      const api = createApi(token);
      await api.post("/api/pets", formData);

      toast.success("Pet cadastrado com sucesso!");

      setPreviews([]);
      setFiles([]);

    } catch (error: any) {
      console.error(error.response)

      toast.error("Erro ao cadastrar pet. Por favor Tente novamente.");
    }
  }

  return (
    <Container>
      <div className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl font-medium text-neutral-700">Cadastrar novo pet</h1>
        <p className="text-gray-600 mt-2">Aqui você pode cadastrar um novo pet, e deixa-lo disponível para adoção.</p>
      </div>

      <div className="max-w-screen-xl mx-auto py-6">
        {alertMaxImages && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Ops!</strong>
            <span className="block sm:inline"> Você atingiu o limite de imagens ({MAX_IMAGES}).</span>
          </div>
        )}
      </div>

      {/* Previews */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {previews.map((src, index) => (
          <div key={index} className="relative border p-2">
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
            <img
              src={src}
              alt={`Preview ${index}`}
              className="w-full h-32 object-cover"
            />
          </div>
        ))}
      </div>

      <div className="max-w-screen-xl mx-auto py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Nome é obrigatório" })}
                className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
               />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Idade</label>
              <input
                type="text"
                id="age"
                {...register("age", { required: "Idade é obrigatório" })}
                className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso</label>
              <input
                type="text"
                id="weight"
                {...register("weight", { required: "Peso é obrigatório" })}
                className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
              />
              {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">Porte</label>
              <select
                id="size"
                {...register("size", { required: "Porte é obrigatório" })}
                className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
              >
                <option value="P">Pequeno</option>
                <option value="M">Médio</option>
                <option value="G">Grande</option>
              </select>
              {errors.size && <p className="text-red-500 text-sm">{errors.size.message}</p>}
            </div>
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">Cor</label>
              <input
                type="text"
                id="color"
                {...register("color", { required: "Cor é obrigatória" })}
                className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
              />
              {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">Imagens</label>
              <input
                type="file"
                id="images"
                accept=".jpg,.jpeg,.png"
                multiple
                {...register("images", { 
                  required: "Imagens são obrigatórias",
                  onChange: handleFileChange,
                })}
                className="w-full p-2 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
               />
               {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
              <span className="text-sm text-gray-500">O limite máximo de images é { MAX_IMAGES}. São permitidas apenas images (png, jpg e jpeg)</span>
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Cadastrar</button>
          </div>
        </form>
      </div>
    </Container>
  );
}