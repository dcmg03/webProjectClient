'use client';

import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const items = [
    { label: 'Inicio', icon: 'pi pi-home', url: '/' },
    { label: 'Rubros', icon: 'pi pi-list', url: '/rubros' },
    { label: 'Ayuda', icon: 'pi pi-question-circle', url: '/ayuda' },
  ];

  return (
    <html lang="es">
      <head>
        <title>Sistema de Gestión Presupuestal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f5f5f5' }}>
        <Menubar model={items} style={{ backgroundColor: '#007ad9', color: 'white' }} />
        <main style={{ padding: '2rem' }}>{children}</main>
      </body>
    </html>
  );
}
