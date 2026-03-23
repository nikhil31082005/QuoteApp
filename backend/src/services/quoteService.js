const QuoteRepository = require('../repositories/quoteRepository');

const getAllQuotes = async (page = 1, limit = 20, category = null, author = null) => {
    const offset = (page - 1) * limit;
    const quotes = await QuoteRepository.findAll(parseInt(limit), parseInt(offset), category, author);
    return quotes;
};

const getQuoteById = async (id) => {
    const quote = await QuoteRepository.findById(id);
    if (!quote) {
        throw new Error('Quote not found');
    }
    return quote;
};

const getRandomQuote = async () => {
    const quote = await QuoteRepository.getRandom();
    return quote;
};

const createQuote = async (quoteData) => {
    // Basic validation
    if (!quoteData.quote_text) {
        throw new Error('Quote text is required');
    }

    const newQuoteId = await QuoteRepository.create(quoteData);
    return { id: newQuoteId, ...quoteData };
};

const getDailyPick = async () => {
    const quote = await QuoteRepository.getLatestDailyPick();
    return quote;
};

const getQuoteByAuthor = async (page = 1, limit = 20, author) => {
    const offset = (page - 1) * limit;
    const quotes = await QuoteRepository.findByAuthor(parseInt(limit), parseInt(offset), author);
    if (quotes?.length > 0) {
        return { quotes, isAvailable: true };
    }
    return { quotes, isAvailable: false };
}

const searchAuthors = async (searchTerm) => {
    return await QuoteRepository.searchAuthors(searchTerm);
};

module.exports = {
    getAllQuotes,
    getQuoteById,
    getRandomQuote,
    createQuote,
    getDailyPick,
    getQuoteByAuthor,
    searchAuthors
};
