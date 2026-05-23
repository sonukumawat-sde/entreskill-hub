const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 1. Naya User Register karne ka logic (Updated with Auto-Login)
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User is email se pehle hi register hai' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        // NAYA CODE: Register hote hi turant Token (VIP Pass) banao
        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET,                
            { expiresIn: '7d' }                    
        );

        // NAYA CODE: Success response mein token bhi bhej do
        res.status(201).json({
            message: 'User successfully register ho gaya!',
            token: token, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Server mein kuch problem aayi hai' });
    }
};
// 2. User Login karne ka logic
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // FIX: .select('+password') lagaya taaki comparison ke liye password database se nikal kar aaye
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Galat email ya password' });
        }

        // FIX: User.js mein jo matchPassword function banaya tha, uska use kiya ekdum pro style mein
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Galat email ya password' });
        }

        // Agar password sahi hai, toh JWT (VIP Pass) banate hain
        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET,                
            { expiresIn: '7d' }                    
        );

        // Success response
        res.status(200).json({
            message: 'Login successful!',
            token: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server mein kuch problem aayi hai' });
    }
};

// User ki profile laane wala logic
const getUserProfile = async (req, res) => {
    try {
        // req.user._id humein 'protect' middleware se milti hai
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                // 👇 YAHAN HUMNE NAYI FIELDS ADD KI HAIN 👇
                skills: user.skills,
                budget: user.budget,
                timeCommitment: user.timeCommitment,
                isOnboarded: user.isOnboarded
            });
        } else {
            res.status(404).json({ message: 'User nahi mila' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Profile laane mein error aayi', error: error.message });
    }
};
// NAYA CODE: User ka Onboarding data (skills, budget, time) save karne ka logic
const saveOnboardingData = async (req, res) => {
    try {
        const { skills, budget, timeCommitment } = req.body;

        // protect guard ne user ki ID req.user._id mein daal di thi
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User nahi mila' });
        }

        // Database mein data update karna
        user.skills = skills;
        user.budget = budget;
        user.timeCommitment = timeCommitment;
        user.isOnboarded = true; // Mark kar diya ki step complete ho gaya

        // Updated user ko save karna
        const updatedUser = await user.save();

        res.status(200).json({
            message: 'Onboarding data successfully save ho gaya!',
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                skills: updatedUser.skills,
                budget: updatedUser.budget,
                timeCommitment: updatedUser.timeCommitment,
                isOnboarded: updatedUser.isOnboarded
            }
        });

    } catch (error) {
        console.error("Onboarding Error:", error);
        res.status(500).json({ message: 'Data save karne mein problem aayi' });
    }
};

// NAYA FUNCTION: User apni profile update kar sake
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Agar user ne naya data bheja hai, toh usko update karo, warna purana hi rehne do
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            
            // Sirf wahi fields update karenge jo user change karna chahta hai
            if (req.body.skills) user.skills = req.body.skills;
            if (req.body.budget) user.budget = req.body.budget;
            if (req.body.timeCommitment) user.timeCommitment = req.body.timeCommitment;

            // Database mein naya data save kar do
            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                skills: updatedUser.skills,
                budget: updatedUser.budget,
                timeCommitment: updatedUser.timeCommitment,
                isOnboarded: updatedUser.isOnboarded,
                message: 'Profile successfully update ho gayi! 🎉'
            });
        } else {
            res.status(404).json({ message: 'User nahi mila' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Profile update karne mein error aayi', error: error.message });
    }
};

// Ek hi baar export karna best practice hai
module.exports = { registerUser, loginUser, getUserProfile, saveOnboardingData, updateUserProfile };