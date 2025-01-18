const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../controllers/userController');

// GET /user/:userId - Get user info (id, level, referrals)
router.get('/:userId', getUserInfo);

module.exports = router;
