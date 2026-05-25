const express = require('express');
const router = express.Router();
const { sendSupportEmail } = require('../controllers/supportController');

// Jab frontend /api/support/contact par POST request bhejega, toh email jayegi
router.post('/contact', sendSupportEmail);

module.exports = router;