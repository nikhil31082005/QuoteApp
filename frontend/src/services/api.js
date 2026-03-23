const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
    const headers = {};
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const QuoteService = {
    async getDailyQuote() {
        try {
            const response = await fetch(`${API_URL}/quotes/daily`, { headers: getHeaders() });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Failed to fetch daily quote', error);
            return null;
        }
    },

    async getQuoteByAuthor(page = 1, limit = 20, category = null) {
        try {
            const response = await fetch(`${API_URL}/quotes/author`, { headers: getHeaders() });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Failed to fetch quotes', error);
            return [];
        }
    },

    async getRandomQuote() {
        try {
            const response = await fetch(`${API_URL}/quotes/random`, { headers: getHeaders() });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Failed to fetch random quote', error);
            return null;
        }
    },

    async searchAuthors(query) {
        try {
            const url = new URL(`${API_URL}/quotes/authors/search`);
            url.searchParams.append('q', query);
            const response = await fetch(url.toString(), { headers: getHeaders() });
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('Failed to search authors', error);
            return [];
        }
    },

    async getQuotes(page = 1, limit = 20, category = null, author = null) {
        try {
            const url = new URL(`${API_URL}/quotes`);
            url.searchParams.append('page', page);
            url.searchParams.append('limit', limit);
            if (category) {
                url.searchParams.append('category', category);
            }
            if (author) {
                url.searchParams.append('author', author);
            }
            const response = await fetch(url.toString(), { headers: getHeaders() });
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('Failed to fetch quotes', error);
            return [];
        }
    }
};
