'use client';

import { useEffect, useState } from 'react';
import { PetProps } from '@/types/pet.type';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const defaultImage = "/assets/no-image.png";

export function PetsList() {
  const defaultLimit = process.env.DEFAULT_PET_PER_PAGE ?? 32;
  const [pets, setPets] = useState<PetProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasPets, setHasPets] = useState(true);

  const fetchPets = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets?page=${page}&limit=${defaultLimit}&sort=desc`);
    const data = await response.json();
    if (data.error) {
      setLoading(false);
      redirect('/');
    };

    if (data.data.pets.length === 0) {
      setHasMore(false);
      setHasPets(false);
    } else {
      setHasPets(true);
    }

    setPets(prev => [...prev, ...data.data.pets]);
    setHasMore(data.data.has_next);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (

    (!hasPets && (
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-lg text-gray-700 mt-4">Nenhum pet encontrado</h2>
        <p className="text-gray-500">Tente novamente mais tarde.</p>
      </div>
    )) ||

    <div>
      <section className="grid gap-7 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white py-4">
            <div className="relative w-full h-48 hover:transform hover:scale-105 transition-all duration-300">
              <Image
                src={pet?.images?.[0] ? `${process.env.NEXT_PUBLIC_API_URL}${pet.images[0]}` : defaultImage}
                alt={pet.name}
                className="object-cover border-2 border-gray-200"
                fill
                quality={100}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
              />
            </div>

            <div className="flex flex-col mt-4 items-start justify-center">
              <h2 className="text-lg text-neutral-700 font-bold mt-4">{pet.name}</h2>
              <p className="text-gray-600 text-sm">Idade: {pet.age}</p>
              <p className="text-gray-600 text-sm">Peso: {pet.weight}</p>
              <p className="text-gray-600 text-sm">Porte: {pet.size}</p>
              <p className="text-gray-600 text-sm">Cor: {pet.color}</p>

              {pet.available ? (
                <Link href={`/pets/${pet.id}`} className="w-full">
                  <button className="px-4 py-2 mt-4 w-full bg-blue-500 text-white hover:bg-blue-400 transition-all duration-300">
                    Conhecer
                  </button>
                </Link>
              ) : (
                <button className="px-4 py-2 mt-4 w-full bg-gray-400 text-gray-700 cursor-not-allowed" disabled>
                  Indisponível
                </button>
              )}
            </div>
          </div>
        ))}
      </section>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={fetchPets}
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
          >
            {loading ? 'Carregando...' : 'Carregar mais'}
          </button>
        </div>
      )}
    </div>
  );
}
