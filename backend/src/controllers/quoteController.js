const QuoteService = require('../services/quoteService');

const getAllQuotes = async (req, res) => {
    try {
        const { page, limit, category, author } = req.query;
        const quotes = await QuoteService.getAllQuotes(page, limit, category, author);
        res.status(200).json({ success: true, data: quotes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getQuoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await QuoteService.getQuoteById(id);
        res.status(200).json({ success: true, data: quote });
    } catch (error) {
        if (error.message === 'Quote not found') {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

const getRandomQuote = async (req, res) => {
    try {
        const quote = await QuoteService.getRandomQuote();
        res.status(200).json({ success: true, data: quote });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createQuote = async (req, res) => {
    try {
        const newQuote = await QuoteService.createQuote(req.body);
        res.status(201).json({ success: true, data: newQuote });
    } catch (error) {
        if (error.message === 'Quote text is required') {
            return res.status(400).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

const getDailyPick = async (req, res) => {
    try {
        const quote = await QuoteService.getDailyPick();
        if (!quote) {
            return res.status(404).json({ success: false, message: 'No daily quote found' });
        }
        res.status(200).json({ success: true, data: quote });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getQuoteByAuthor = async (req, res) => {
    try {
        const { author } = req.params;
        const { page, limit } = req.query;
        const data = await QuoteService.getQuoteByAuthor(page, limit, author);
        if (!data.isAvailable) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }
        return res.status(200).json({ success: true, data: data.quotes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const searchAuthors = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(200).json({ success: true, data: [] });
        }
        const authors = await QuoteService.searchAuthors(q);
        res.status(200).json({ success: true, data: authors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
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
