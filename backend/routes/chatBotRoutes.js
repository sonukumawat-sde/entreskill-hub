const express = require('express');
const router = express.Router();

// Exact same spelling aur path ensure kar rahe hain
const { handleAIChat } = require('../controllers/chatBotController');

// Route setup
router.post('/ask', handleAIChat);

module.exports = router;