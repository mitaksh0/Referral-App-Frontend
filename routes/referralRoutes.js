const express = require('express');
const router = express.Router();
const { purchase } = require('../controllers/referralController');

// POST /referral/purchase - Process a purchase and calculate referral earnings
router.post('/purchase', purchase);

module.exports = router;
