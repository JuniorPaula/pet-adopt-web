import Link from "next/link";

export function Header() {
  return (
    <header className="w-full h-20 bg-slate-100 text-black px-2 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between h-20 sm:justify-between">
        <nav className="flex items-center justify-center">
          <Link href="/" className="text-2xl font-bold">
            Pet<span className="text-blue-700">Adopt</span>
          </Link>
        </nav>

        <div>
          Ola, <span className="font-semibold">Usuário</span>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Link href="/pets" className="text-lg font-semibold hover:text-blue-400 duration-200">
            Pets
          </Link>
          <Link href="/perfil" className="text-lg font-semibold hover:text-blue-400 duration-200">
            Meu perfil
          </Link>
          <Link href="/login" className="text-lg font-semibold hover:text-blue-400 duration-200">
            Login
          </Link>
          <Link href="/register" className="text-lg font-semibold hover:text-blue-400 duration-200">
            Registrar
          </Link>
        </div>
      </div>
    </header>
  );
}