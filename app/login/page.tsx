'use client';

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

const handleLogin = async () => {
    setErrorMessage('');
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include', // Importante para enviar cookies
        });

        if (response.ok) {
            router.push('/rubros'); // Redirigir tras login exitoso
        } else {
            setErrorMessage('Credenciales inválidas. Inténtalo nuevamente.');
        }
    } catch (error) {
        setErrorMessage('Error al iniciar sesión. Verifica tu conexión.');
    }
};

    return (
        <div className="flex justify-content-center align-items-center h-screen bg-gray-100">
            <Card title="Iniciar Sesión" style={{ width: '30rem' }}>
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="username">Usuario</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ingresa tu usuario"
                        />
                    </div>
                    <div className="field mt-3">
                        <label htmlFor="password">Contraseña</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>
                    {errorMessage && (
                        <small className="p-error">{errorMessage}</small>
                    )}
                    <Button
                        label="Iniciar Sesión"
                        icon="pi pi-sign-in"
                        className="p-button-primary mt-4"
                        onClick={handleLogin}
                    />
                </div>
            </Card>
        </div>
    );
}
