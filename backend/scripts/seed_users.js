const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../src/config/db');

const BATCH_SIZE = 500;
const SALT_ROUNDS = 10; // Same as authController

async function seedUsers() {
    try {
        console.log('Connecting to database...');
        const connection = await db.getConnection();
        console.log('✅ Connected.');

        // 1. Read the JSON file
        const dataPath = path.join(__dirname, '../../users.json');
        console.log(`Reading users from ${dataPath}...`);

        if (!fs.existsSync(dataPath)) {
            console.error('❌ Could not find users.json. Run jsongenerater.js first.');
            process.exit(1);
        }

        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const users = JSON.parse(rawData);
        console.log(`Found ${users.length} users. Hashing passwords and inserting...`);

        let insertedCount = 0;

        for (let i = 0; i < users.length; i += BATCH_SIZE) {
            const batch = users.slice(i, i + BATCH_SIZE);

            // Hash all passwords in this batch
            const hashedBatch = await Promise.all(batch.map(async (u) => {
                const salt = await bcrypt.genSalt(SALT_ROUNDS);
                const hashedPassword = await bcrypt.hash(u.password, salt);
                return [u.username, u.email, hashedPassword];
            }));

            const insertQuery = 'INSERT IGNORE INTO users (username, email, password) VALUES ?';
            await connection.query(insertQuery, [hashedBatch]);

            insertedCount += batch.length;
            console.log(`Inserted ${insertedCount} / ${users.length} users...`);
        }

        console.log('✅ All users seeded successfully!');
        connection.release();
        process.exit(0);

    } catch (error) {
        console.error('❌ Failed to seed users:', error);
        process.exit(1);
    }
}

seedUsers();
