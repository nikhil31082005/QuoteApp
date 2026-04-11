import apiClient from './apiClient';

export const QuoteService = {
    async getDailyQuote() {
        try {
            const response = await apiClient.get('/quotes/daily');
            return response.data.success ? response.data.data : null;
        } catch (error) {
            console.error('Failed to fetch daily quote', error);
            return null;
        }
    },

    async getQuoteByAuthor(page = 1, limit = 20, category = null) {
        try {
            const response = await apiClient.get('/quotes/author');
            return response.data.success ? response.data.data : null;
        } catch (error) {
            console.error('Failed to fetch quotes', error);
            return [];
        }
    },

    async getRandomQuote() {
        try {
            const response = await apiClient.get('/quotes/random');
            return response.data.success ? response.data.data : null;
        } catch (error) {
            console.error('Failed to fetch random quote', error);
            return null;
        }
    },

    async searchAuthors(query) {
        try {
            const response = await apiClient.get('/quotes/authors/search', { params: { q: query } });
            return response.data.success ? response.data.data : [];
        } catch (error) {
            console.error('Failed to search authors', error);
            return [];
        }
    },

    async getQuotes(page = 1, limit = 20, category = null, author = null) {
        try {
            const params = { page, limit };
            if (category) params.category = category;
            if (author) params.author = author;
            
            const response = await apiClient.get('/quotes', { params });
            return response.data.success ? response.data.data : [];
        } catch (error) {
            console.error('Failed to fetch quotes', error);
            return [];
        }
    },

    async createReaction(id, reaction) {
        try {
            const response = await apiClient.post(`/quotes/${id}/reaction`, { reaction });
            return response.data;
        } catch (error) {
            console.error('Failed to create reaction', error);
            return { success: false };
        }
    }
};
