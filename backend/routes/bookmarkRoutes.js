const express = require('express');
const router = express.Router();

// Controller se functions import kar rahe hain
const { toggleBookmark, getBookmarks } = require('../controllers/bookmarkController');

// Auth middleware import kar rahe hain taaki koi bina login kiye bookmark na kar sake
// (Agar tumhara middleware kisi aur naam se hai toh file path check kar lena)
const { protect } = require('../middleware/authMiddleware'); 

// Yeh line ensure karegi ki in routes ko access karne se pehle user ka login hona zaroori hai
router.use(protect);

// GET request: User ke saare bookmarked ideas fetch karne ke liye
router.get('/', getBookmarks);

// POST request: Idea ko save ya remove karne ke liye
router.post('/toggle', toggleBookmark);

module.exports = router;