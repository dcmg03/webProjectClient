'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Rubro = {
  id: number;
  nombre: string;
  presupuestoInicial: number;
  presupuestoDisponible: number;
};

export default function RubroDetailPage() {
  const { id } = useParams(); // Obtén el ID del rubro desde la URL
  const [rubro, setRubro] = useState<Rubro | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/rubros/${id}`) // Endpoint del backend
      .then((res) => res.json())
      .then((data) => setRubro(data))
      .catch((error) => console.error('Error al cargar el rubro:', error));
  }, [id]);

  if (!rubro) return <p>Cargando...</p>;

  return (
    <main>
      <h1>Detalle del Rubro</h1>
      <p>Nombre: {rubro.nombre}</p>
      <p>Presupuesto Inicial: ${rubro.presupuestoInicial}</p>
      <p>Presupuesto Disponible: ${rubro.presupuestoDisponible}</p>
      <Link href="/rubros">Volver a la lista de rubros</Link>
    </main>
  );
}
