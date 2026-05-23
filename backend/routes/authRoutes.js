const express = require('express');
const router = express.Router();

// Import list mein 'updateUserProfile' ko add kiya hai
const { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    saveOnboardingData, 
    updateUserProfile 
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

// Public Routes (Bina login ke)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes (Sirf login wale VIP users ke liye)
router.get('/profile', protect, getUserProfile); // Profile ka data laane ke liye
router.post('/onboarding', protect, saveOnboardingData); // Onboarding data save karne ke liye

// 👇 NAYA ROUTE: Profile update karne ke liye (PUT method use karte hain update ke liye) 👇
router.put('/profile', protect, updateUserProfile);

module.exports = router;