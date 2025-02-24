import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">Oops! Página não encontrada.</p>

      <div className="flex gap-4">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Voltar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
