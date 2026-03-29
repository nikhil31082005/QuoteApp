const express = require('express');
const router = express.Router();
const QuoteController = require('../controllers/quoteController');

const { authenticateToken } = require('../middleware/authMiddleware');

// GET /api/quotes
router.get('/', QuoteController.getAllQuotes);

// GET /api/quotes/random
router.get('/random', QuoteController.getRandomQuote);

// GET /api/quotes/daily
router.get('/daily', QuoteController.getDailyPick);

// GET /api/quotes/authors/search
router.get('/authors/search', authenticateToken, QuoteController.searchAuthors);

// GET /api/quotes/:id
router.get('/:id', QuoteController.getQuoteById);

// POST /api/quotes
router.post('/', QuoteController.createQuote);

// GET /api/quotes/author/:author
router.get('/author/:author', QuoteController.getQuoteByAuthor);

// POST /api/quotes/:id/reaction
router.post('/:id/reaction', authenticateToken, QuoteController.createReaction);

module.exports = router;
