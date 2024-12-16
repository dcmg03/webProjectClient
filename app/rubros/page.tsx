'use client';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Chart } from 'primereact/chart';
import { supabase } from '@/services/supabaseClient';

export default function RubrosPage() {
    const [rubros, setRubros] = useState([]);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [selectedRubro, setSelectedRubro] = useState(null);

    const [nombre, setNombre] = useState('');
    const [presupuestoInicial, setPresupuestoInicial] = useState(null);

    // Obtener rubros desde Supabase
    useEffect(() => {
        fetchRubros();
    }, []);

    const fetchRubros = async () => {
        const { data, error } = await supabase.from('rubro').select('*');
        if (error) {
            console.error('Error al obtener los rubros:', error);
        } else {
            setRubros(data);
        }
    };

    // Guardar o actualizar un rubro
    const handleSaveRubro = async () => {
        if (isUpdateMode && selectedRubro) {
            await updateRubro();
        } else {
            await addRubro();
        }
    };

    const addRubro = async () => {
        const { data, error } = await supabase
            .from('rubro')
            .insert([{ nombre, presupuesto_inicial: presupuestoInicial, presupuesto_disponible: presupuestoInicial }])
            .select();

        if (error) {
            console.error('Error al agregar el rubro:', error);
        } else {
            setRubros([...rubros, ...data]);
            closeDialog();
        }
    };

    const updateRubro = async () => {
        const { error } = await supabase
            .from('rubro')
            .update({ nombre, presupuesto_inicial: presupuestoInicial })
            .eq('id', selectedRubro.id);
        if (error) {
            console.error('Error al actualizar el rubro:', error);
        } else {
            fetchRubros();
            closeDialog();
        }
    };

    // Eliminar un rubro
    const handleDeleteRubro = async (id) => {
        const { error } = await supabase.from('rubro').delete().eq('id', id);
        if (error) {
            console.error('Error al eliminar el rubro:', error);
        } else {
            setRubros(rubros.filter((r) => r.id !== id));
        }
    };

    const closeDialog = () => {
        setIsDialogVisible(false);
        setIsUpdateMode(false);
        setSelectedRubro(null);
        setNombre('');
        setPresupuestoInicial(null);
    };

    const actualizarTemplate = (rowData) => (
        <Button
            label="Actualizar"
            icon="pi pi-refresh"
            className="p-button-success p-button-outlined"
            onClick={() => {
                setSelectedRubro(rowData);
                setNombre(rowData.nombre);
                setPresupuestoInicial(rowData.presupuesto_inicial);
                setIsUpdateMode(true);
                setIsDialogVisible(true);
            }}
        />
    );

    const eliminarTemplate = (rowData) => (
        <Button
            label="Eliminar"
            icon="pi pi-trash"
            className="p-button-danger p-button-outlined"
            onClick={() => handleDeleteRubro(rowData.id)}
        />
    );

    const chartDataPie = {
        labels: rubros.map((r) => r.nombre),
        datasets: [
            {
                data: rubros.map((r) => r.presupuesto_disponible),
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043', '#9CCC65'],
                hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#FF8A65', '#AED581'],
            },
        ],
    };

    const chartDataBar = {
        labels: rubros.map((r) => r.nombre),
        datasets: [
            {
                label: 'Presupuesto Inicial',
                backgroundColor: '#42A5F5',
                data: rubros.map((r) => r.presupuesto_inicial),
            },
            {
                label: 'Presupuesto Disponible',
                backgroundColor: '#66BB6A',
                data: rubros.map((r) => r.presupuesto_disponible),
            },
        ],
    };

    const dialogFooter = (
        <div>
            <Button label="Guardar" icon="pi pi-check" className="p-button-primary" onClick={handleSaveRubro} />
            <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={closeDialog} />
        </div>
    );

    const headerTemplate = (
        <div className="flex justify-content-between align-items-center">
            <h2 className="text-primary">Rubros Disponibles</h2>
            <Button
                label="Agregar Rubro"
                icon="pi pi-plus"
                className="p-button-primary"
                onClick={() => {
                    setIsDialogVisible(true);
                    setIsUpdateMode(false);
                }}
            />
        </div>
    );

    return (
        <main style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
            <Card title={headerTemplate}>
                <DataTable value={rubros} paginator rows={5} responsiveLayout="scroll" emptyMessage="No hay rubros disponibles.">
                    <Column field="nombre" header="Nombre" sortable></Column>
                    <Column field="presupuesto_inicial" header="Presupuesto Inicial" sortable></Column>
                    <Column header="Actualizar" body={actualizarTemplate}></Column>
                    <Column header="Eliminar" body={eliminarTemplate}></Column>
                </DataTable>
            </Card>

            <Card className="mt-4" title="Distribución de Presupuestos">
                <Chart type="pie" data={chartDataPie} />
            </Card>

            <Card className="mt-4" title="Comparación de Presupuestos">
                <Chart type="bar" data={chartDataBar} />
            </Card>

            {/* Modal para agregar o actualizar rubro */}
            <Dialog
                header={isUpdateMode ? 'Actualizar Rubro' : 'Agregar Nuevo Rubro'}
                visible={isDialogVisible}
                style={{ width: '30vw' }}
                footer={dialogFooter}
                onHide={closeDialog}>
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
