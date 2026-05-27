const { GoogleGenerativeAI } = require('@google/generative-ai');
const BusinessIdea = require('../models/BusinessIdea');
const Roadmap = require('../models/Roadmap'); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAIRecommendations = async (req, res) => {
    try {
        const { skills, investmentLevel } = req.body;
        const allIdeas = await BusinessIdea.find().lean();

        if (!allIdeas || allIdeas.length === 0) {
            return res.status(200).json({ recommendations: [] });
        }

        // 🔥 THE SMART JAVASCRIPT MATCHING ALGORITHM 🔥
        const smartFallbackMatch = () => {
            if (!skills || skills.length === 0) return allIdeas.slice(0, 3);

            const userSkillsLower = skills.map(s => s.toLowerCase().trim());

            let matchedIdeas = allIdeas.filter(idea => {
                if (!idea.requiredSkills) return false;
                const ideaSkillsLower = idea.requiredSkills.map(s => s.toLowerCase().trim());
                return ideaSkillsLower.some(skill => userSkillsLower.includes(skill));
            });

            if (matchedIdeas.length === 0) {
                matchedIdeas = allIdeas;
            }

            return matchedIdeas.slice(0, 3).map(idea => ({
                ...idea,
                aiReasoning: "Matched instantly by our internal Smart Algorithm based on your skills."
            }));
        };

        if (!skills || skills.length === 0) {
            return res.status(200).json({ recommendations: smartFallbackMatch() });
        }

        // 🚀 PLAN A: TRY GOOGLE AI
        try {
            const ideaContext = allIdeas.map(idea => idea.title).join(", ");
            const prompt = `
            User skills: ${skills.join(', ')}. Budget: ${investmentLevel || 'Any'}.
            Available ideas: ${ideaContext}.
            Select exactly 3 ideas from the list that match the skills.
            Return ONLY a valid JSON array like: [{"ideaTitle": "Exact Title", "matchReason": "Short reason"}]
            `;

            // 🔥 FIXED: Updated to latest Google model
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            let responseText = result.response.text();

            responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const startIndex = responseText.indexOf('[');
            const endIndex = responseText.lastIndexOf(']');
            if (startIndex !== -1 && endIndex !== -1) {
                responseText = responseText.substring(startIndex, endIndex + 1);
            }

            const aiMatches = JSON.parse(responseText);
            const matchedTitles = aiMatches.map(match => match.ideaTitle);
            const finalIdeas = allIdeas.filter(idea => matchedTitles.includes(idea.title));

            if (finalIdeas.length === 0) throw new Error("AI matches not found in DB");

            const customizedIdeas = finalIdeas.map(idea => {
                const aiData = aiMatches.find(match => match.ideaTitle === idea.title);
                return {
                    ...idea,
                    aiReasoning: aiData ? aiData.matchReason : "Matched by AI based on your profile."
                };
            });

            return res.status(200).json({ recommendations: customizedIdeas });

        } catch (aiError) {
            console.log("🚨 Google AI Failed. Activating Smart JS Algorithm...");
            return res.status(200).json({ recommendations: smartFallbackMatch() });
        }

    } catch (error) {
        console.error("Main Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// 🔥 NEW: 5-STEP DETAILED ROADMAP GENERATOR 🔥
const generateRoadmap = async (req, res) => {
    try {
        const { goal, userId } = req.body; 

        if (!goal || !userId) {
            return res.status(400).json({ success: false, message: "Goal and User ID are required to generate a roadmap." });
        }

        const prompt = `
        Act as an expert career and business mentor. The user wants to achieve this goal: "${goal}".
        Create a highly detailed, realistic, and strictly 5-step roadmap to achieve this goal.
        
        Return ONLY a valid JSON object with the following exact structure, with no markdown formatting or backticks:
        {
            "title": "Roadmap to ${goal}",
            "steps": [
                {
                    "stepNumber": 1,
                    "title": "Clear Step Title",
                    "description": "Detailed and actionable description of what to do in this step.",
                    "estimatedTime": "e.g., 2 weeks or 1 month",
                    "resources": ["Resource 1 name", "Resource 2 name"]
                }
            ]
        }
        Ensure there are exactly 5 steps in the array.
        `;

        // 🔥 FIXED: Updated to latest Google model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        let responseText = result.response.text();

        responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
        const startIndex = responseText.indexOf('{');
        const endIndex = responseText.lastIndexOf('}');
        
        if (startIndex !== -1 && endIndex !== -1) {
            responseText = responseText.substring(startIndex, endIndex + 1);
        }

        const roadmapData = JSON.parse(responseText);

        const newRoadmap = new Roadmap({
            userId: userId,
            goal: goal,
            title: roadmapData.title,
            steps: roadmapData.steps
        });

        const savedRoadmap = await newRoadmap.save();
        
        return res.status(200).json({
            success: true,
            roadmap: savedRoadmap 
        });

    } catch (error) {
        console.error("Roadmap Generation Error:", error);
        res.status(500).json({ success: false, message: "Failed to generate roadmap. Please try again." });
    }
};

module.exports = { 
    getAIRecommendations, 
    generateRoadmap 
};