'use client';

import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        setError('');
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                router.push('/login'); // Redirigir al login
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            setError('Error al registrar. Intenta nuevamente.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
            <h2>Registro</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="p-field">
                <label htmlFor="username">Nombre de usuario</label>
                <InputText
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu nombre de usuario"
                />
            </div>
            <div className="p-field mt-3">
                <label htmlFor="password">Contraseña</label>
                <Password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                />
            </div>
            <Button
                label="Registrar"
                icon="pi pi-user-plus"
                className="p-button-primary mt-4"
                onClick={handleRegister}
            />
        </div>
    );
}
