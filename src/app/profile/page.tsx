import { Container } from "@/components/container";

export default function ProfilePage() {
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
              <form>
                <div className="mb-4">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Nome</label>
                  <input type="text" id="first_name" className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm" />
                </div>
                <div className="mb-4">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Sobrenome</label>
                  <input type="text" id="last_name" className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                  <input type="password" id="password" className="w-full p-2 mb-0 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm" />
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
              <form>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                  <input type="text" id="phone" className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm" />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Rua</label>
                  <input type="text" id="address" className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm" />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
                  <input type="text" id="city" className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700">Estado</label>
                  <input type="text" id="province" className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700">CEP</label>
                  <input type="text" id="zip_code" className="w-full p-2 mb-3 mt-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm" />
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
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm
                shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-red-500"
              >
                  Excluir Conta
              </button>
            </div>
          </section>
        </main>
      </Container>
    </div>
  );
}