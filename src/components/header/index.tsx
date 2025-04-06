"use client";

import { useAuth } from "@/context/auth-context";
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

const logo = "/assets/pet-adopt-logo.png";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full h-20 bg-slate-100 text-black px-2 shadow-md sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between h-20 sm:justify-between">
        <nav className="flex items-center justify-center">
          <Link href="/" className="text-2xl font-bold">
            <Image
              src={logo}
              alt="Logo Pet Adopt"
              width={100}
              height={100}
              className="h-10 w-auto"
              quality={100}
              priority
            />
          </Link>
        </nav>

        <div className="flex items-center justify-center space-x-4">
          <Link href="/pets" className="rounded-sm py-1.5 px-3 text-sm/6 hover:bg-blue-400 duration-200">
            Pets
          </Link>

          {user ? (
            <>
              <Link href="/adoptions" className="rounded-sm py-1.5 px-3 text-sm/6 hover:bg-blue-400 duration-200">
                Minhas adoções
              </Link>

              <div className="sm:p-0">
                <Menu as="div" className="relative z-10">
                    <MenuButton
                    className="inline-flex items-center gap-2 rounded-sm py-1.5 px-3 text-sm/6 font-semibold text-gray-800 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-400 data-[open]:bg-blue-300 data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                    { user?.first_name ?? Menu }
                  </MenuButton>
                  <MenuItems anchor="bottom end" className="absolute mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2">
                      <MenuItem>
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-sm hover:bg-blue-300 transition-colors duration-200"
                          >
                            Dashboard
                          </Link>
                      </MenuItem>
                      <MenuSeparator className="my-1 h-px bg-gray-300" />

                      <MenuItem>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm hover:bg-blue-300 transition-colors duration-200"
                          >
                            Meu perfil
                          </Link>
                      </MenuItem>
                      <MenuSeparator className="my-1 h-px bg-gray-300" />

                      <MenuItem>
                          <Link
                            href="/pets/me"
                            className="block px-4 py-2 text-sm hover:bg-blue-300 transition-colors duration-200"
                          >
                            Meus pets
                          </Link>
                      </MenuItem>
                      <MenuSeparator className="my-1 h-px bg-gray-300" />

                      <MenuItem>
                          <Link
                            href="/adoptions"
                            className="block px-4 py-2 text-sm hover:bg-blue-300 transition-colors duration-200"
                          >
                            Minhas adoções
                          </Link>
                      </MenuItem>

                      <MenuItem>
                          <Link
                            href="/adoptions/confirm"
                            className="block px-4 py-2 text-sm hover:bg-blue-300 transition-colors duration-200"
                          >
                            Confirmar adoção
                          </Link>
                      </MenuItem>

                      <MenuItem>
                        <Link
                          href="/visits"
                          className="block px-4 py-2 text-sm hover:bg-blue-300 transition-colors duration-200"
                        >
                          Visitas agendadas
                        </Link>
                      </MenuItem>
                      <MenuSeparator className="my-1 h-px bg-gray-300" />

                      <MenuItem>
                          <button
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-300 transition-colors duration-200"
                          >
                            Sair
                          </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </div>

            </>

          ) : (
            <>
              <Link href="/login" className="rounded-sm py-1.5 px-3 text-sm/6 hover:bg-blue-400 duration-200">
                Login
              </Link>
              <Link href="/register" className="rounded-sm py-1.5 px-3 text-sm/6 hover:bg-blue-400 duration-200">
                Registrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}