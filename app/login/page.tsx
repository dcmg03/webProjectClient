'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        setError('');
        const { data, error } = await supabase
            .from('app_user')
            .select('*')
            .eq('username', username)
            .single();

        if (error || !data) {
            setError('Usuario no encontrado');
            return;
        }

        if (data.password === password) {
            sessionStorage.setItem('username', data.username);
            router.push('/rubros'); // Redirige a la página de rubros
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Card title="Iniciar Sesión" className="w-4">
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="username">Usuario</label>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="p-field mt-3">
                        <label htmlFor="password">Contraseña</label>
                        <InputText
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && (
                        <Message severity="error" text={error} className="mt-2" />
                    )}
                    <Button label="Iniciar Sesión" icon="pi pi-sign-in" onClick={handleLogin} className="mt-3" />
                </div>
            </Card>
        </div>
    );
}
