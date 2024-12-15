'use client';

import { Menubar } from 'primereact/menubar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Verificar autenticación (ejemplo con cookies, puedes ajustarlo según tus necesidades)
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/'; // Eliminar cookie
    router.push('/login');
  };

  const items = [
    { label: 'Inicio', icon: 'pi pi-home', url: '/' },
    { label: 'Rubros', icon: 'pi pi-list', url: '/rubros' },
    { label: 'Ayuda', icon: 'pi pi-question-circle', url: '/ayuda' },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: handleLogout, // Llama a la función de logout
    },
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
