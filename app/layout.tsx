import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">Sistema de Gestión Presupuestal</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
