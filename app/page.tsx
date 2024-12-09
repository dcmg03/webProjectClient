import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Bienvenido al Sistema de Gestión Presupuestal</h1>
      <p>Administra tus rubros y asignaciones de manera eficiente.</p>
      <Link href="/rubros">Ir a Rubros</Link>
    </main>
  );
}
