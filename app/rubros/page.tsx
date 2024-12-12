'use client';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Chart } from 'primereact/chart';

export default function RubrosPage() {
  const [rubros, setRubros] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [presupuestoInicial, setPresupuestoInicial] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/rubros')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRubros(data);
        } else {
          console.error('La respuesta de la API no es un arreglo:', data);
          setRubros([]);
        }
      })
      .catch((error) => {
        console.error('Error al cargar los rubros:', error);
        setRubros([]);
      });
  }, []);

  const detalleTemplate = (rowData) => (
    <Button
      label="Ver Detalle"
      icon="pi pi-info-circle"
      className="p-button-outlined p-button-success"
    />
  );

  const progresoTemplate = (rowData) => {
    const porcentaje = (rowData.presupuestoDisponible / rowData.presupuestoInicial) * 100;
    return (
      <>
        <ProgressBar value={porcentaje} showValue={false} className="mb-2" />
        <span>{porcentaje.toFixed(2)}%</span>
      </>
    );
  };

  const chartDataPie = {
    labels: rubros.length ? rubros.map((r) => r.nombre) : [],
    datasets: [
      {
        data: rubros.length ? rubros.map((r) => r.presupuestoDisponible) : [],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043', '#9CCC65'],
        hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#FF8A65', '#AED581'],
      },
    ],
  };

  const chartDataBar = {
    labels: rubros.length ? rubros.map((r) => r.nombre) : [],
    datasets: [
      {
        label: 'Presupuesto Inicial',
        backgroundColor: '#42A5F5',
        data: rubros.length ? rubros.map((r) => r.presupuestoInicial) : [],
      },
      {
        label: 'Presupuesto Disponible',
        backgroundColor: '#66BB6A',
        data: rubros.length ? rubros.map((r) => r.presupuestoDisponible) : [],
      },
    ],
  };

  const handleAddRubro = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/rubros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, presupuestoInicial }),
      });

      if (response.ok) {
        const newRubro = await response.json();
        setRubros([...rubros, newRubro]);
        setIsDialogVisible(false);
        setNombre('');
        setPresupuestoInicial(null);
      } else {
        console.error('Error al agregar el rubro');
      }
    } catch (error) {
      console.error('Error al agregar el rubro:', error);
    }
  };

  const dialogFooter = (
    <div>
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-primary"
        onClick={handleAddRubro}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-secondary"
        onClick={() => setIsDialogVisible(false)}
      />
    </div>
  );

  const headerTemplate = (
    <div className="flex justify-content-between align-items-center">
      <h2 className="text-primary">Rubros Disponibles</h2>
      <Button
        label="Agregar Rubro"
        icon="pi pi-plus"
        className="p-button-primary"
        onClick={() => setIsDialogVisible(true)}
      />
    </div>
  );

  return (
    <main style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <Card title={headerTemplate}>
        <DataTable
          value={rubros}
          paginator
          rows={5}
          responsiveLayout="scroll"
          emptyMessage="No hay rubros disponibles.">
          <Column field="nombre" header="Nombre" sortable></Column>
          <Column field="presupuestoInicial" header="Presupuesto Inicial" sortable></Column>
          <Column field="presupuestoDisponible" header="Presupuesto Disponible" sortable></Column>
          <Column header="Progreso" body={progresoTemplate}></Column>
          <Column header="Acciones" body={detalleTemplate}></Column>
        </DataTable>
      </Card>

      <Card className="mt-4" title="Distribución de Presupuestos">
        <Chart type="pie" data={chartDataPie} />
      </Card>

      <Card className="mt-4" title="Comparación de Presupuestos">
        <Chart type="bar" data={chartDataBar} />
      </Card>

      {/* Modal para agregar rubro */}
      <Dialog
        header="Agregar Nuevo Rubro"
        visible={isDialogVisible}
        style={{ width: '30vw' }}
        footer={dialogFooter}
        onHide={() => setIsDialogVisible(false)}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese el nombre del rubro"
            />
          </div>
          <div className="p-field mt-3">
            <label htmlFor="presupuestoInicial">Presupuesto Inicial</label>
            <InputNumber
              id="presupuestoInicial"
              value={presupuestoInicial}
              onValueChange={(e) => setPresupuestoInicial(e.value)}
              mode="currency"
              currency="USD"
              placeholder="Ingrese el presupuesto inicial"
            />
          </div>
        </div>
      </Dialog>
    </main>
  );
}
