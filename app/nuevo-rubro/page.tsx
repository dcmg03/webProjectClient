'use client';

import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import Link from 'next/link';

export default function NuevoRubroPage() {
  const [nombre, setNombre] = useState('');
  const [presupuestoInicial, setPresupuestoInicial] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/rubros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, presupuestoInicial }),
      });
      if (response.ok) {
        alert('Rubro agregado exitosamente.');
        setNombre('');
        setPresupuestoInicial(null);
      } else {
        alert('Error al agregar el rubro.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <main style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <Card title="Agregar Nuevo Rubro">
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
          <div className="mt-4">
            <Button
              label="Guardar"
              icon="pi pi-check"
              className="p-button-primary mr-2"
              onClick={handleSubmit}
            />
            <Link href="/rubros">
              <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" />
            </Link>
          </div>
        </div>
      </Card>
    </main>
  );
}
