const express = require('express');
const router = express.Router();
const QuoteController = require('../controllers/quoteController');

// GET /api/quotes
router.get('/', QuoteController.getAllQuotes);

// GET /api/quotes/random
router.get('/random', QuoteController.getRandomQuote);

// GET /api/quotes/daily
router.get('/daily', QuoteController.getDailyPick);

// GET /api/quotes/:id
router.get('/:id', QuoteController.getQuoteById);

// POST /api/quotes
router.post('/', QuoteController.createQuote);

module.exports = router;
