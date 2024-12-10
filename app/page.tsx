'use client';

import Link from 'next/link';
import { Button } from 'primereact/button';

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-6">Sistema de Gestión Presupuestal</h1>
      <p className="text-lg mb-4">Administra tus rubros y asignaciones de manera eficiente.</p>
      <Link href="/rubros">
        <Button label="Ir a Rubros" icon="pi pi-arrow-right" className="p-button-rounded p-button-primary" />
      </Link>
    </main>
  );
}
