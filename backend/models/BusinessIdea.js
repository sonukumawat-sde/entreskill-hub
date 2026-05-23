const mongoose = require('mongoose');

const businessIdeaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true, // Jaise 'AI Resume Analyzer' ya 'Cloud Kitchen'
        },
        description: {
            type: String,
            required: true,
        },
        // TUNING 1: ObjectId ki jagah direct Strings ka array kar diya taaki matching fast aur accurate ho
        requiredSkills: {
            type: [String], 
            default: []
        },
        investmentLevel: {
            type: String,
            enum: ['Zero (₹0)', 'Bootstrap (Under ₹5,000)', 'Small Investment (₹5,000 - ₹20,000)', 'Funded (₹20,000+)'], 
            default: 'Zero (₹0)',
        },
        estimatedCost: {
            type: String, // Jaise '₹0 - ₹2,000'
            required: true,
        },
        // TUNING 2: Dashboard UI ke matching tags ke liye fields
        category: {
            type: String,
            required: true, // Jaise 'Tech SaaS', 'Food & Bev'
        },
        demand: {
            type: String,
            enum: ['Medium', 'High', 'Very High'],
            default: 'High',
        },
        // 👇 NAYA ADDITION: Har business ka apna Roadmap
        roadmap: [
            {
                stageName: { type: String, required: true },
                description: { type: String, required: true },
                tasks: [
                    {
                        title: { type: String, required: true },
                        taskType: { type: String, enum: ['video', 'reading', 'interactive', 'action'], required: true },
                        duration: { type: String, required: true }
                    }
                ]
            }
        ]
    },
    {
        timestamps: true,
    }
);

const BusinessIdea = mongoose.model('BusinessIdea', businessIdeaSchema);

module.exports = BusinessIdea;