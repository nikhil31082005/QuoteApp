const db = require('../config/db');

const findAll = async (limit, offset, category = null) => {
    let query = 'SELECT * FROM quotes';
    const params = [];

    if (category) {
        query += ' WHERE JSON_CONTAINS(categories, ?)';
        params.push(JSON.stringify(category));
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const [rows] = await db.query(query, params);
    return rows;
};

const findById = async (id) => {
    const query = 'SELECT * FROM quotes WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0];
};

const create = async (quoteData) => {
    const { quote_text, author, work, categories } = quoteData;

    // 1. First insert the quote into the quotes table
    const insertQuoteQuery = 'INSERT INTO quotes (quote_text, author, work, categories) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(insertQuoteQuery, [
        quote_text,
        author || null,
        work || null,
        categories ? JSON.stringify(categories) : null
    ]);

    // console.log("Nikhi", result); 


    const quoteId = result.insertId;

    // 2. Then, if this is a "Daily Pick", insert it into daily_picks using the quoteId
    if (categories && categories.includes("Daily Pick")) {
        // Note: Using daily_picks here assuming you created it as daily_picks.
        // If you named it daily_pick, please change this to daily_pick.
        const dailyPickQuery = 'INSERT INTO daily_picks (quote_id, date_picked) VALUES (?, CURDATE())';
        await db.execute(dailyPickQuery, [quoteId]);
    }

    return quoteId;
};

const getRandom = async () => {
    const query = 'SELECT * FROM quotes ORDER BY RAND() LIMIT 1';
    const [rows] = await db.execute(query);
    return rows[0];
};

const getLatestDailyPick = async () => {
    // 3. Update query to fetch all quote data by joining daily_picks with quotes
    // Note: Assuming table names are daily_picks and quotes based on your instructions.
    const query = `
        SELECT q.* 
        FROM daily_picks dp
        JOIN quotes q ON dp.quote_id = q.id
        ORDER BY dp.date_picked DESC, q.id DESC
        LIMIT 1
    `;
    const [rows] = await db.execute(query);
    return rows[0] || null;
};

const hasDailyPickForToday = async () => {
    const query = 'SELECT COUNT(*) as count FROM daily_picks WHERE date_picked = CURDATE()';
    const [rows] = await db.execute(query);
    return rows[0].count > 0;
};

module.exports = {
    findAll,
    findById,
    create,
    getRandom,
    getLatestDailyPick,
    hasDailyPickForToday
};
