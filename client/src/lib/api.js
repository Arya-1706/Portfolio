
import axios from 'axios';

// In development, /api is proxied to localhost:5000.
// In production, set VITE_API_URL to your backend URL ending in /api.

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
