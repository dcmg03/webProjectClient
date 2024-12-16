const API_URL = "http://localhost:3005/auth"; // Reemplaza con la URL correcta del backend

const api = {
    login: async (data: { username: string; password: string }) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        return await response.json();
    },
};

export default api;
