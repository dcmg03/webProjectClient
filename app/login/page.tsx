import { useState } from "react";
import api from "@/middleware";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await api.post("/auth/login", { username, password });
            localStorage.setItem("token", response.data.token);
            alert("Login exitoso");
        } catch (error) {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div>
            <h1>Iniciar sesión</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
    );
}
