const Mentor = require('../models/Mentor');

// @desc    Register a new mentor
// @route   POST /api/mentors/register
// @access  Public (Ya fir Admin, depending on flow)
const registerMentor = async (req, res) => {
    try {
        const { name, email, expertise, experienceYears, bio, linkedInProfile } = req.body;

        // 1. Check if all required fields are provided
        if (!name || !email || !expertise || !experienceYears || !bio) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide all required fields (name, email, expertise, experienceYears, bio).' 
            });
        }

        // 2. Check if mentor with this email already exists
        const existingMentor = await Mentor.findOne({ email });
        if (existingMentor) {
            return res.status(400).json({ 
                success: false, 
                message: 'A mentor with this email is already registered.' 
            });
        }

        // 3. Create and save the new mentor (isVerified will be false by default as per Model)
        const newMentor = new Mentor({
            name,
            email,
            expertise,
            experienceYears,
            bio,
            linkedInProfile: linkedInProfile || ''
        });

        await newMentor.save();

        // 4. Send success response
        res.status(201).json({
            success: true,
            message: 'Mentor registered successfully. Waiting for Admin verification.',
            mentor: newMentor
        });

    } catch (error) {
        console.error('Error registering mentor:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while registering mentor. Please try again later.' 
        });
    }
};

// @desc    Get all verified mentors (For the Directory page)
// @route   GET /api/mentors
// @access  Public (Ya logged in users only)
const getVerifiedMentors = async (req, res) => {
    try {
        // Fetch only mentors where isVerified is true
        const mentors = await Mentor.find({ isVerified: true }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: mentors.length,
            mentors: mentors
        });

    } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while fetching mentors.' 
        });
    }
};

// @desc    Get a single mentor by ID (For Mentor Profile page)
// @route   GET /api/mentors/:id
// @access  Public
const getMentorById = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: 'Mentor not found.'
            });
        }

        res.status(200).json({
            success: true,
            mentor: mentor
        });

    } catch (error) {
        console.error('Error fetching mentor by ID:', error);
        // Handle invalid MongoDB ID error
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Mentor not found. Invalid ID format.'
            });
        }
        res.status(500).json({ 
            success: false, 
            message: 'Server error while fetching mentor details.' 
        });
    }
};

module.exports = {
    registerMentor,
    getVerifiedMentors,
    getMentorById
};