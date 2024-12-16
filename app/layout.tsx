'use client';

import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <title>Web Project</title>
        </head>
        <body>
        <AuthProvider>
            <div>
                <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <span>Web Project</span>
                    <button
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                localStorage.removeItem('token');
                                window.location.href = '/login';
                            }
                        }}
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            cursor: 'pointer',
                        }}
                    >
                        Logout
                    </button>
                </nav>
                <main>{children}</main>
            </div>
        </AuthProvider>
        </body>
        </html>
    );
}
