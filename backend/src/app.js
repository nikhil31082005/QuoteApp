const express = require('express');
const cors = require('cors');
const quoteRoutes = require('./routes/quoteRoutes');
const authRoutes = require('./routes/authRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
    'http://localhost:5173', // Local Vite development
    process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, '') : null // Strip trailing slash if accidentally added
].filter(Boolean); // Remove anything falsy

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Quotes API is running' });
});

module.exports = app;
