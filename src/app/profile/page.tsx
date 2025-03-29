"use client";
import { Container } from "@/components/container";
import { UserProps } from "@/types/user.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createApi } from "@/services/axios-service";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type UserFormData = UserProps & {
  password?: string;
}

export default function ProfilePage() {
  const [ user, setUser ] = useState<UserFormData>();
  const [ isOpen, setIsOpen ] = useState(false);
  const [ confirmName, setConfirmName ] = useState("");
  const router = useRouter();
  const userName = user?.first_name + " " + user?.last_name;

  useEffect(() => {
    const token = Cookies.get("authToken");
    const api = createApi(token);

    const fetchUser = async () => {
      try {
        const response = await api.get("/api/users/profile");
        if (response.data.error) {
          console.error(response.data.message);
          return;
        }
        setUser(response.data.data);
      } catch (error: any) {
        console.error(error.response?.data);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      password: user?.password,
      details: {
        phone: user?.details?.phone,
        address: user?.details?.address,
        city: user?.details?.city,
        province: user?.details?.province,
        zip_code: user?.details?.zip_code,
      },
    }

    const token = Cookies.get("authToken");
    const api = createApi(token);
    try {
      const response = await api.put("/api/users/profile", payload);
      if (response.data.error) {
        console.error(response.data.message);
        toast.error("Ops! Ocorreu um erro ao atualizar o perfil.");
        return;
      }
      setUser(response.data.data);
      toast.success("Perfil atualizado com sucesso!");
    }
    catch (error: any) {
      console.error(error.response?.data);
      toast.error("Erro Interno no Servidor.");
    }
  }

  const handleDelete = () => {
    if (confirmName === userName) {
      const token = Cookies.get("authToken");
      const api = createApi(token);
      api.delete("/api/users/profile")
        .then((response) => {
          if (response.data.error) {
            console.error(response.data.message);
            toast.error("Ops! Ocorreu um erro ao excluir a conta.");
            return;
          }
          toast.success("Conta excluída com sucesso!");
          Cookies.remove("authToken");
          router.push("/");
        })
        .catch((error: any) => {
          console.error(error.response?.data);
          toast.error("Erro Interno no Servidor.");
        });
      }
  };

  return (
    <div className="w-full">
      <Container>
        <div className="max-w-screen-xl mx-auto py-6">
          <h1 className="text-2xl font-medium text-neutral-700">Perfil</h1>
          <p className="text-gray-600 mt-2">Aqui você pode ver e editar suas informações pessoais e dados de endereço.</p>
        </div>

        <main className="max-w-screen-xl mx-auto py-6">
          <section className="overflow-x-auto border p-3 mb-6 border-gray-200">
            <div className="bg-white p-6">
              <h2 className="text-xl font-semibold text-neutral-600 mb-4">Informações Pessoais</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Nome</label>
                  <input 
                    type="text"
                    id="first_name"
                    value={user?.first_name ?? ""}
                    onChange={(e) => setUser( user ? { ...user, first_name: e.target.value } : undefined)}
                    className="w-full text-neutral-600 p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                   />
                </div>
                <div className="mb-4">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Sobrenome</label>
                  <input 
                    type="text"
                    id="last_name"
                    value={user?.last_name ?? ""}
                    onChange={(e) => setUser( user ? { ...user, last_name: e.target.value } : undefined)}
                    className="w-full text-neutral-600 p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={user?.email ?? ""}
                    onChange={(e) => setUser( user ? { ...user, email: e.target.value } : undefined)}
                    className="w-full text-neutral-600 p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="********"
                    onChange={(e) => setUser( user ? { ...user, password: e.target.value } : undefined)}
                    className="w-full text-neutral-600 p-2 mb-0 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                  <span className="text-gray-500 text-sm">Deixe em branco para manter a senha atual.</span>
                </div>
                <button 
                  type="submit" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm
                      shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-blue-500"
                  >
                  Salvar
                </button>
              </form>
            </div>
          </section>

          <section className="overflow-x-auto border p-3 mt-6 border-gray-200">
            <div className="bg-white p-6">
              <h2 className="text-xl font-semibold text-neutral-600 mb-4">Informações Adicionais</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                  <input
                    type="text"
                    id="phone"
                    value={user?.details?.phone ?? ""}
                    onChange={(e) => setUser( user ? { ...user, details: { ...user.details, phone: e.target.value } } : undefined)}
                    className="w-full text-neutral-600 p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Rua</label>
                  <input
                    type="text"
                    id="address"
                    value={user?.details?.address ?? ""}
                    onChange={(e) => setUser( user ? { ...user, details: { ...user.details, address: e.target.value } } : undefined)}
                    className="w-full text-neutral-600 p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
                  <input
                    type="text"
                    id="city"
                    value={user?.details?.city ?? ""}
                    onChange={(e) => setUser( user ? { ...user, details: { ...user.details, city: e.target.value } } : undefined)}
                    className="w-full text-neutral-600 p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700">Estado</label>
                  <input
                    type="text"
                    id="province"
                    value={user?.details?.province ?? ""}
                    onChange={(e) => setUser( user ? { ...user, details: { ...user.details, province: e.target.value } } : undefined)}
                    className="w-full text-neutral-600 p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700">CEP</label>
                  <input
                    type="text"
                    id="zip_code"
                    value={user?.details?.zip_code ?? ""}
                    onChange={(e) => setUser( user ? { ...user, details: { ...user.details, zip_code: e.target.value } } : undefined)}
                    className="w-full text-neutral-600 p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>
                <button 
                  type="submit" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm
                      shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-blue-500"
                  >
                  Salvar
                </button>
              </form>
            </div>
          </section>

          <br />

          <section className="overflow-x-auto mt-6 border p-3 border-red-500">
            <div className="bg-white p-6">
              <h2 className="text-xl font-semibold text-red-600 mb-4">Dange Zone</h2>
              <p className="text-red-500 mb-4">Essa ação não pode ser desfeita.</p>
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm
                shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-red-500"
              >
                  Excluir Conta
              </button>
            </div>
          </section>

          {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-bold text-gray-700 mb-4">Tem certeza que deseja excluir a conta?</h3>
                  <p className="mb-4 text-gray-700">
                    Digite <span className="font-semibold">{userName}</span> para confirmar a exclusão da sua conta.
                  </p>

                  <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4 text-gray-700"
                  />

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={confirmName !== userName}
                      className={`px-4 py-2 rounded text-white ${
                        confirmName === userName
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-red-300 cursor-not-allowed"
                      }`}
                    >
                      Confirmar Exclusão
                    </button>
                  </div>
                </div>
              </div>
            )}
        </main>
      </Container>
    </div>
  );
}