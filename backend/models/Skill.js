const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true, // Ek skill ka naam ek hi baar aayega (e.g., 'Tailoring')
        },
        category: {
            type: String,
            required: true, // Jaise 'Handicrafts', 'Services', 'Technical'
        }
    },
    {
        timestamps: true,
    }
);

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;