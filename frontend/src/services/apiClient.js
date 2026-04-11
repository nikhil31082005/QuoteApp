import axios from 'axios';
import { store } from '../store';
import { setLogout } from '../store/authSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(setLogout());
        }
        return Promise.reject(error);
    }
);

export default apiClient;
