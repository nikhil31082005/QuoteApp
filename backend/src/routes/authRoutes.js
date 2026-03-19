const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');


// GET /api/auth/check
router.get('/check', AuthController.checkUserRegistered);

// POST /api/auth/register
router.post('/register', AuthController.registerUser);

// POST /api/auth/login
router.post('/login', AuthController.loginUser);

module.exports = router;
