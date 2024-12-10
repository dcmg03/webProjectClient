'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function DetalleRubroPage({ params }) {
  const { id } = params;
  const [rubro, setRubro] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/rubros/${id}`)
      .then((res) => res.json())
      .then((data) => setRubro(data))
      .catch((error) => console.error('Error al cargar el rubro:', error));
  }, [id]);

  if (!rubro) {
    return <p className="p-6">Cargando...</p>;
  }

  return (
    <main className="p-6">
      <Card title={`Rubro: ${rubro.nombre}`} className="mb-4">
        <p>Presupuesto Inicial: ${rubro.presupuestoInicial}</p>
        <p>Presupuesto Disponible: ${rubro.presupuestoDisponible}</p>
      </Card>
      <Link href="/rubros">
        <Button label="Volver a Rubros" icon="pi pi-arrow-left" className="p-button-secondary" />
      </Link>
    </main>
  );
}
