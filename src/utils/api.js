import axios from 'axios';

const API_BASE_URL = 'http://localhost:9876'; // Base URL for the backend

// Create an Axios instance with the base URL
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // Get the access token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
});

export default apiClient;