'use client';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Link from 'next/link';
import { Button } from 'primereact/button';

export default function RubrosPage() {
  const [rubros, setRubros] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/rubros')
      .then((res) => res.json())
      .then((data) => setRubros(data))
      .catch((error) => console.error('Error al cargar los rubros:', error));
  }, []);

  const detalleTemplate = (rowData) => {
    return (
      <Link href={`/rubros/${rowData.id}`}>
        <Button label="Ver Detalle" icon="pi pi-info-circle" className="p-button-text" />
      </Link>
    );
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Lista de Rubros</h1>
      <DataTable value={rubros} paginator rows={5} responsiveLayout="scroll">
        <Column field="nombre" header="Nombre"></Column>
        <Column field="presupuestoInicial" header="Presupuesto Inicial"></Column>
        <Column field="presupuestoDisponible" header="Presupuesto Disponible"></Column>
        <Column header="Acciones" body={detalleTemplate}></Column>
      </DataTable>
      <div className="mt-4">
        <Link href="/">
          <Button label="Volver al Inicio" icon="pi pi-arrow-left" className="p-button-secondary" />
        </Link>
      </div>
    </main>
  );
}
