const express = require('express');
const router = express.Router();

// Controller se functions import kar rahe hain (Yahan getIdeaById add kiya hai)
const { 
    getRecommendations, 
    getAllBusinessIdeas, 
    seedBusinessIdeas,
    getIdeaById 
} = require('../controllers/recommendationController');

const { protect } = require('../middleware/authMiddleware');

// 1. SEED ROUTE: Database mein ideas dalne ke liye (Ispe guard nahi lagaya taaki browser se direct chal jaye)
router.get('/seed', seedBusinessIdeas);

// 2. MAIN API ROUTES: Frontend se ideas match karne aur laane ke liye (Inpe guard laga hai)
router.post('/match', protect, getRecommendations);
router.get('/all', protect, getAllBusinessIdeas);

// 👇 NAYA ROUTE: Specific Idea (aur uska Roadmap) laane ke liye 👇
// Ispe bhi 'protect' laga diya hai taaki sirf logged-in user hi dekh sake
router.get('/:id', protect, getIdeaById);

module.exports = router;