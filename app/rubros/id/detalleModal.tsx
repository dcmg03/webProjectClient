'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

export default function DetalleModal({ rubro, visible, onHide }) {
  const [asignaciones, setAsignaciones] = useState([]);
  const [isAddAsignacionVisible, setIsAddAsignacionVisible] = useState(false);
  const [newMonto, setNewMonto] = useState(null);
  const [newDescripcion, setNewDescripcion] = useState('');

  const fetchAsignaciones = () => {
    // Simula llamada al backend
    fetch(`http://localhost:8080/api/asignaciones?rubroId=${rubro.id}`)
      .then((res) => res.json())
      .then((data) => setAsignaciones(data))
      .catch((error) => console.error('Error al cargar asignaciones:', error));
  };

  const handleAddAsignacion = async () => {
    if (!newMonto || !newDescripcion) {
      return alert('Por favor llena todos los campos.');
    }

    try {
      const response = await fetch('http://localhost:8080/api/asignaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rubroId: rubro.id,
          monto: newMonto,
          descripcion: newDescripcion,
        }),
      });

      if (response.ok) {
        const asignacion = await response.json();
        setAsignaciones([...asignaciones, asignacion]);
        setNewMonto(null);
        setNewDescripcion('');
        setIsAddAsignacionVisible(false);
      } else {
        console.error('Error al agregar asignación.');
      }
    } catch (error) {
      console.error('Error al agregar asignación:', error);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchAsignaciones();
    }
  }, [visible]);

  const asignacionesFooter = (
    <div>
      <Button
        label="Agregar Asignación"
        icon="pi pi-plus"
        className="p-button-primary"
        onClick={() => setIsAddAsignacionVisible(true)}
      />
    </div>
  );

  return (
    <Dialog header={`Detalle de Rubro: ${rubro.nombre}`} visible={visible} onHide={onHide}>
      <h4>Presupuesto Inicial: ${rubro.presupuestoInicial}</h4>
      <h4>Presupuesto Disponible: ${rubro.presupuestoDisponible}</h4>

      <h5>Asignaciones</h5>
      <DataTable value={asignaciones} footer={asignacionesFooter}>
        <Column field="descripcion" header="Descripción"></Column>
        <Column field="monto" header="Monto"></Column>
      </DataTable>

      {/* Modal para agregar asignación */}
      <Dialog
        header="Agregar Asignación"
        visible={isAddAsignacionVisible}
        onHide={() => setIsAddAsignacionVisible(false)}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="descripcion">Descripción</label>
            <InputText
              id="descripcion"
              value={newDescripcion}
              onChange={(e) => setNewDescripcion(e.target.value)}
            />
          </div>
          <div className="p-field">
            <label htmlFor="monto">Monto</label>
            <InputNumber
              id="monto"
              value={newMonto}
              onValueChange={(e) => setNewMonto(e.value)}
              mode="currency"
              currency="USD"
              placeholder="Monto de la asignación"
            />
          </div>
        </div>
        <div className="p-dialog-footer">
          <Button
            label="Guardar"
            icon="pi pi-check"
            onClick={handleAddAsignacion}
          />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            className="p-button-secondary"
            onClick={() => setIsAddAsignacionVisible(false)}
          />
        </div>
      </Dialog>
    </Dialog>
  );
}
