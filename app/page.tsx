"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Redirección en Next.js
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import api from "@/services/api"; // Asegúrate de tener esto configurado

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter(); // Hook para redirigir

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reiniciar el error

        try {
            const response = await api.login({ username, password });
            if (response.token) {
                localStorage.setItem("token", response.token);
                router.push("/rubros"); // Redirige a rubros después del login
            }
        } catch (err) {
            setError("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="flex align-items-center justify-content-center min-h-screen" style={{ backgroundColor: "#f0f2f5" }}>
            <Card title="Iniciar Sesión" style={{ width: "25rem", padding: "2rem" }}>
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="p-field mb-3">
                        <label htmlFor="username" className="block font-medium mb-1">
                            Usuario
                        </label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ingresa tu usuario"
                            required
                        />
                    </div>

                    <div className="p-field mb-3">
                        <label htmlFor="password" className="block font-medium mb-1">
                            Contraseña
                        </label>
                        <InputText
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                    <Button type="submit" label="Iniciar Sesión" icon="pi pi-sign-in" className="w-full mb-3" />

                    <Button
                        type="button"
                        label="Ver Rubros"
                        icon="pi pi-book"
                        className="p-button-secondary w-full"
                        onClick={() => router.push("/rubros")} // Redirección a Rubros
                    />
                </form>
            </Card>
        </div>
    );
}
