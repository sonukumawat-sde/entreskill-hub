const express = require('express');
const router = express.Router();

// Controller se functions import kar rahe hain
const { 
    registerMentor, 
    getVerifiedMentors, 
    getMentorById 
} = require('../controllers/mentorController');

// Routes define kar rahe hain
// POST request naya mentor register karne ke liye
router.post('/register', registerMentor);

// GET request saare verified mentors ko fetch karne ke liye (Directory ke liye)
router.get('/', getVerifiedMentors);

// GET request kisi ek specific mentor ki details nikalne ke liye (Profile view ke liye)
router.get('/:id', getMentorById);

module.exports = router;