'use client';

import { useState, useEffect } from 'react';
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

  const headerTemplate = (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Detalles del Rubro</h2>
    </div>
  );

  return (
    <main className="p-6">
      <Card title={`Rubro: ${rubro.nombre}`} className="shadow-md" header={headerTemplate}>
        <p className="text-lg">
          <strong>Presupuesto Inicial:</strong> ${rubro.presupuestoInicial}
        </p>
        <p className="text-lg">
          <strong>Presupuesto Disponible:</strong> ${rubro.presupuestoDisponible}
        </p>
      </Card>
      <div className="mt-4">
        <Link href="/rubros">
          <Button label="Volver a Rubros" icon="pi pi-arrow-left" className="p-button-secondary" />
        </Link>
      </div>
    </main>
  );
}


