const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    expertise: { 
        type: [String], // Array of strings (e.g., ['Business Strategy', 'Marketing', 'Legal'])
        required: true 
    },
    experienceYears: { 
        type: Number, 
        required: true 
    },
    bio: { 
        type: String, 
        required: true 
    },
    isVerified: { 
        type: Boolean, 
        default: false // PRD ke hisaab se Admin pehle verify karega
    },
    linkedInProfile: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Mentor', mentorSchema);