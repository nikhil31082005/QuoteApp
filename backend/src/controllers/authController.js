const AuthService = require('../services/authService');
const bcrypt = require('bcryptjs');
const jwt = require('../config/jwt');

const checkUserRegistered = async (req, res) => {
    try {
        const { email } = req.body;
        const isUserRegistered = await AuthService.checkUser(email);
        res.status(200).json({ success: true, data: isUserRegistered });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Username, email and password are required" });
        }

        const isUserRegistered = await AuthService.checkUser(email);

        if (isUserRegistered) {
            return res.status(409).json({ success: false, data: "User already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const registeredUser = await AuthService.registerUser(username, email, hashedPassword);

        res.status(200).json({ success: true, token: registeredUser.token, data: registeredUser.registeredUser });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const isUserRegistered = await AuthService.checkUser(email);

        if (!isUserRegistered) {
            return res.status(404).json({ success: false, data: "User not registered" });
        } else {
            const hashedPassword = await AuthService.loginUser(email);
            const isPasswordValid = await bcrypt.compare(password, hashedPassword);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, data: "Invalid password" });
            } else {
                const token = jwt.generateToken({ email });
                res.status(200).json({ success: true, token: token, data: "User logged in successfully" });
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    checkUserRegistered,
    registerUser,
    loginUser
};