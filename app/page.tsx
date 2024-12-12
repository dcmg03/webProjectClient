'use client';

import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function HomePage() {
  return (
    <main className="p-6" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card
        title="Sistema de Gestión Presupuestal"
        subTitle="Administra tus rubros y asignaciones de manera eficiente"
        className="shadow-2"
        style={{ maxWidth: '500px', textAlign: 'center' }}
      >
        <p className="text-lg mb-4" style={{ color: '#6c757d' }}>
          Este sistema te ayudará a gestionar tus presupuestos de forma eficiente.
        </p>
        <Link href="/rubros">
          <Button
            label="Ir a Rubros"
            icon="pi pi-arrow-right"
            className="p-button-rounded p-button-primary"
            style={{ fontWeight: 'bold', padding: '1rem 2rem' }}
          />
        </Link>
      </Card>
    </main>
  );
}
