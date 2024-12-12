'use client';

import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function NuevoRubroPage() {
  const [rubro, setRubro] = useState({ nombre: '', presupuestoInicial: 0 });

  const handleSubmit = () => {
    fetch('http://localhost:8080/api/rubros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rubro),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Rubro agregado con éxito');
        window.location.href = '/rubros'; // Redirige a la lista de rubros
      })
      .catch((error) => {
        console.error('Error al agregar rubro:', error);
        alert('Hubo un error al agregar el rubro');
      });
  };

  return (
    <main className="p-6">
      <Card title="Nuevo Rubro" className="shadow-md">
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="nombre">Nombre del Rubro</label>
            <InputText
              id="nombre"
              value={rubro.nombre}
              onChange={(e) => setRubro({ ...rubro, nombre: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="presupuestoInicial">Presupuesto Inicial</label>
            <InputText
              id="presupuestoInicial"
              type="number"
              value={rubro.presupuestoInicial}
              onChange={(e) =>
                setRubro({ ...rubro, presupuestoInicial: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <Button label="Guardar" icon="pi pi-save" className="p-button-success mt-4" onClick={handleSubmit} />
        </div>
      </Card>
      <div className="mt-4">
        <Button label="Volver" icon="pi pi-arrow-left" className="p-button-secondary" onClick={() => (window.location.href = '/rubros')} />
      </div>
    </main>
  );
}