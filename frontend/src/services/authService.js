import apiClient from './apiClient';

export const AuthService = {
    async register(userData) {
        try {
            const response = await apiClient.post('/auth/register', userData);
            return response.data; // normally { success, message }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Registration failed';
            throw new Error(message);
        }
    },

    async login(credentials) {
        try {
            const response = await apiClient.post('/auth/login', credentials);
            return response.data; // { success, token, user }
        } catch (error) {
            const message = error.response?.data?.message || error.response?.data?.data || error.message || 'Login failed';
            throw new Error(message);
        }
    },

    async logout() {
        try {
            const response = await apiClient.post('/auth/logout');
            return response.data;
        } catch (error) {
            console.error('Logout failed:', error);
            return { success: false };
        }
    }
};
