const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const QuoteService = {
    async getDailyQuote() {
        try {
            const response = await fetch(`${API_URL}/quotes/daily`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Failed to fetch daily quote', error);
            return null;
        }
    },

    async getRandomQuote() {
        try {
            const response = await fetch(`${API_URL}/quotes/random`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Failed to fetch random quote', error);
            return null;
        }
    },

    async getQuotes(page = 1, limit = 20, category = null) {
        try {
            const url = new URL(`${API_URL}/quotes`);
            url.searchParams.append('page', page);
            url.searchParams.append('limit', limit);
            if (category) {
                url.searchParams.append('category', category);
            }
            const response = await fetch(url.toString());
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('Failed to fetch quotes', error);
            return [];
        }
    }
};
