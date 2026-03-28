const QuoteRepository = require('../repositories/quoteRepository');
const AuthRepository = require('../repositories/authRepository');

const getAllQuotes = async (page = 1, limit = 20, category = null, author = null) => {
    const offset = (page - 1) * limit;
    const quotes = await QuoteRepository.findAll(parseInt(limit), parseInt(offset), category, author);

    // Attach like and dislike counts to each quote
    const quotesWithCounts = await Promise.all(quotes.map(async (q) => {
        const like_count = await QuoteRepository.getLikeCount(q.id);
        const dislike_count = await QuoteRepository.getDislikeCount(q.id);
        return { ...q, like_count, dislike_count };
    }));

    return quotesWithCounts;
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

const createReaction = async (quoteId, reaction, email) => {
    const quote = await QuoteRepository.findById(quoteId);
    if (!quote) {
        throw new Error('Quote not found');
    }
    const data = await AuthRepository.checkUser(email);
    if (!data || data.length === 0) {
        throw new Error('User not found in database');
    }
    const userId = data[0].id;
    const result = await QuoteRepository.createReaction(quoteId, reaction, userId);
    const likeCount = await QuoteRepository.getLikeCount(quoteId);
    const dislikeCount = await QuoteRepository.getDislikeCount(quoteId);
    return { result, quote, likeCount, dislikeCount };
}

module.exports = {
    getAllQuotes,
    getQuoteById,
    getRandomQuote,
    createQuote,
    getDailyPick,
    getQuoteByAuthor,
    searchAuthors,
    createReaction
};
