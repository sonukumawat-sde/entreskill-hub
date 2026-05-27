const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    steps: [{
        stepNumber: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        estimatedTime: {
            type: String,
            required: true
        },
        resources: [{
            type: String
        }]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Roadmap', roadmapSchema);