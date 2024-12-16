import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // URL del backend
});

// Interceptor para agregar el token JWT a cada solicitud
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
