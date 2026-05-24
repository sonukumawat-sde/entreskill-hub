const express = require('express');
const router = express.Router();

// AI Controller ko import kar rahe hain
const { getAIRecommendations } = require('../controllers/aiController');

// Naya Route: Jab frontend '/match' par data bhejega, toh Gemini AI sochega
router.post('/match', getAIRecommendations);

module.exports = router;