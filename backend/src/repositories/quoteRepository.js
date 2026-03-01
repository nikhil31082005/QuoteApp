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
    const query = 'INSERT INTO quotes (quote_text, author, work, categories) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [
        quote_text,
        author || null,
        work || null,
        categories ? JSON.stringify(categories) : null
    ]);
    return result.insertId;
};

const getRandom = async () => {
    const query = 'SELECT * FROM quotes ORDER BY RAND() LIMIT 1';
    const [rows] = await db.execute(query);
    return rows[0];
};

const getLatestDailyPick = async () => {
    const query = 'SELECT * FROM quotes WHERE JSON_CONTAINS(categories, ?) ORDER BY id DESC LIMIT 1';
    // "Daily Pick" is the exact category string used in cron job
    const [rows] = await db.query(query, [JSON.stringify("Daily Pick")]);
    return rows[0] || null;
};

module.exports = {
    findAll,
    findById,
    create,
    getRandom,
    getLatestDailyPick
};
