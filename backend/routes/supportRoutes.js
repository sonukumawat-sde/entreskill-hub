const express = require('express');
const router = express.Router();

// Import the controller
const { sendSupportEmail } = require('../controllers/supportController');

// Define the route
router.post('/contact', sendSupportEmail);

module.exports = router;