const express = require('express');
const cors = require('cors');
const quoteRoutes = require('./routes/quoteRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/quotes', quoteRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Quotes API is running' });
});

module.exports = app;
