const express = require('express');
const router = express.Router();
const { handleAIChat } = require('../controllers/chatBotController');

// POST request for AI Chat
router.post('/ask', handleAIChat);

module.exports = router;