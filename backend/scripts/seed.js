const fs = require('fs');
const path = require('path');
const db = require('../src/config/db');

async function seedDatabase() {
    try {
        console.log('Connecting to database...');
        const connection = await db.getConnection();
        console.log('✅ Connected.');

        // 1. Read the JSON file
        const dataPath = path.join(__dirname, '../../quotes.json');
        console.log(`Reading dataset from ${dataPath}...`);

        if (!fs.existsSync(dataPath)) {
            console.error('❌ Could not find quotes.json in the parent directory.');
            process.exit(1);
        }

        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const quotes = JSON.parse(rawData);

        console.log(`Found ${quotes.length} quotes. Preparing to insert...`);

        // We will insert in batches to prevent overwhelming the DB or max_allowed_packet errors
        const BATCH_SIZE = 5000;
        let insertedCount = 0;

        // Create the quotes table if it doesn't exist
        console.log('Creating quotes table if it does not exist...');
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS quotes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                quote_text TEXT NOT NULL,
                author VARCHAR(255),
                work VARCHAR(255),
                categories JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await connection.query(createTableQuery);

        // Truncate existing table first (optional, but good for clean seeding)
        console.log('Truncating existing quotes table...');
        await connection.query('TRUNCATE TABLE quotes');

        for (let i = 0; i < quotes.length; i += BATCH_SIZE) {
            const batch = quotes.slice(i, i + BATCH_SIZE);

            const insertQuery = 'INSERT INTO quotes (quote_text, author, categories) VALUES ?';
            const values = batch.map(q => [
                q.quote,
                q.author,
                JSON.stringify([q.category]) // The category field from the JSON is a string, wrap it in array
            ]);

            await connection.query(insertQuery, [values]);
            insertedCount += batch.length;

            console.log(`Inserted ${insertedCount} / ${quotes.length} quotes...`);
        }

        console.log('✅ All quotes seeded successfully!');
        connection.release();
        process.exit(0);

    } catch (error) {
        console.error('❌ Failed to seed the database:', error);

        if (error.code === 'ECONNREFUSED' || error.message.includes('Access denied for user')) {
            console.log('\n--- IMPORTANT ---');
            console.log('Make sure your MySQL server is running and your credentials in backend/.env are correct.');
            console.log('If your root user has a password, please update backend/.env then run this script again.');
        }

        process.exit(1);
    }
}

seedDatabase();
