'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Rubro = {
  id: number;
  nombre: string;
  presupuestoInicial: number;
  presupuestoDisponible: number;
};

export default function RubrosPage() {
  const [rubros, setRubros] = useState<Rubro[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/rubros') // Reemplaza con el endpoint de tu backend
      .then((res) => res.json())
      .then((data) => setRubros(data))
      .catch((error) => console.error('Error al cargar rubros:', error));
  }, []);

  return (
    <main>
      <h1>Lista de Rubros</h1>
      <ul>
        {rubros.map((rubro) => (
          <li key={rubro.id}>
            <Link href={`/rubros/${rubro.id}`}>
              {rubro.nombre} - ${rubro.presupuestoDisponible}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/">Volver al inicio</Link>
    </main>
  );
}
