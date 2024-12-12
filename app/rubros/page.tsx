'use client';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { Chart } from 'primereact/chart';

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
        <Button label="Ver Detalle" icon="pi pi-info-circle" className="p-button-outlined p-button-success" />
      </Link>
    );
  };

  const progresoTemplate = (rowData) => {
    const porcentaje = (rowData.presupuestoDisponible / rowData.presupuestoInicial) * 100;
    return (
      <div>
        <ProgressBar value={porcentaje} className={porcentaje < 20 ? 'p-progressbar-danger' : ''} />
        {porcentaje < 20 && <small className="text-red-500">Presupuesto Crítico</small>}
      </div>
    );
  };

  const chartData = {
    labels: rubros.map((r) => r.nombre),
    datasets: [
      {
        data: rubros.map((r) => r.presupuestoDisponible),
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043', '#9CCC65'],
      },
    ],
  };

  const headerTemplate = (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Rubros Disponibles</h2>
      <Link href="/nuevo-rubro">
        <Button label="Agregar Rubro" icon="pi pi-plus" className="p-button-primary" />
      </Link>
    </div>
  );

  return (
    <main className="p-6">
      <Card className="shadow-md" header={headerTemplate}>
        <DataTable value={rubros} paginator rows={5} responsiveLayout="scroll" className="mt-4">
          <Column field="nombre" header="Nombre" sortable></Column>
          <Column field="presupuestoInicial" header="Presupuesto Inicial" sortable></Column>
          <Column field="presupuestoDisponible" header="Presupuesto Disponible" sortable></Column>
          <Column header="Progreso" body={progresoTemplate}></Column>
          <Column header="Acciones" body={detalleTemplate}></Column>
        </DataTable>
        <div className="mt-4">
          <Chart type="pie" data={chartData} />
        </div>
      </Card>
      <div className="mt-4">
        <Link href="/">
          <Button label="Volver al Inicio" icon="pi pi-arrow-left" className="p-button-secondary" />
        </Link>
      </div>
    </main>
  );
}
