require('dotenv').config();
const app = require('./src/app');
const db = require('./src/config/db');
const { initCronJobs } = require('./src/cron/dailyQuoteJob');

const PORT = process.env.PORT || 5000;

// Verify Database connection before starting the server
async function startServer() {
    try {
        const connection = await db.getConnection();
        console.log('✅ Successfully connected to the MySQL database.');
        connection.release();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`Test API: http://localhost:${PORT}/api/quotes/random`);

            initCronJobs();
        });
    } catch (error) {
        console.error('❌ Failed to connect to MySQL database:', error.message);
        console.log('Please ensure your database is running and credentials in .env are correct.');
        process.exit(1);
    }
}

startServer();
