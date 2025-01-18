const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');

// POST /auth/register - Register a new user
router.post('/register', register);

// POST /auth/login - Login an existing user
router.post('/login', login);

// POST /auth/logout - Logout and destroy session
router.post('/logout', logout);

module.exports = router;
