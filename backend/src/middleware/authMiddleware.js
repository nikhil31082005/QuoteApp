const { verifyToken } = require('../config/jwt');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
    }
};

module.exports = {
    authenticateToken,
};
