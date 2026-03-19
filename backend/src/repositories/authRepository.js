const db = require('../config/db');

const checkUser = async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const values = [email];
    const [result] = await db.query(query, values);
    return result.length > 0;
};

const registerUser = async (username, email, password) => {
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const values = [username, email, password];
    const [result] = await db.query(query, values);
    return { id: result.insertId, username, email };
}

const loginUser = async (email) => {
    const query = "SELECT password FROM users WHERE email = ?";
    const values = [email];
    const [result] = await db.query(query, values);
    return result[0].password;
}

module.exports = {
    checkUser,
    registerUser,
    loginUser,
};