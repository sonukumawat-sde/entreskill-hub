const express = require('express');
const router = express.Router();

// AI Controller se dono functions import kar rahe hain
const { getAIRecommendations, generateRoadmap } = require('../controllers/aiController');

// Purana Route: Jab frontend '/match' par data bhejega, toh Gemini AI sochega
router.post('/match', getAIRecommendations);

// 🔥 NAYA ROUTE: 5-Step Detailed Roadmap generate aur save karne ke liye 🔥
router.post('/generate-roadmap', generateRoadmap);

module.exports = router;