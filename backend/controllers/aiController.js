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

        const smartFallbackMatch = () => {
            if (!skills || skills.length === 0) return allIdeas.slice(0, 3);
            const userSkillsLower = skills.map(s => s.toLowerCase().trim());
            let matchedIdeas = allIdeas.filter(idea => {
                if (!idea.requiredSkills) return false;
                const ideaSkillsLower = idea.requiredSkills.map(s => s.toLowerCase().trim());
                return ideaSkillsLower.some(skill => userSkillsLower.includes(skill));
            });
            if (matchedIdeas.length === 0) matchedIdeas = allIdeas;
            return matchedIdeas.slice(0, 3).map(idea => ({
                ...idea,
                aiReasoning: "Matched instantly by our internal Smart Algorithm based on your skills."
            }));
        };

        if (!skills || skills.length === 0) {
            return res.status(200).json({ recommendations: smartFallbackMatch() });
        }

        try {
            const ideaContext = allIdeas.map(idea => idea.title).join(", ");
            const prompt = `User skills: ${skills.join(', ')}. Budget: ${investmentLevel || 'Any'}. Available ideas: ${ideaContext}. Select exactly 3 ideas from the list that match the skills. Return ONLY a valid JSON array like: [{"ideaTitle": "Exact Title", "matchReason": "Short reason"}]`;

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            let responseText = result.response.text();

            responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const startIndex = responseText.indexOf('[');
            const endIndex = responseText.lastIndexOf(']');
            if (startIndex !== -1 && endIndex !== -1) responseText = responseText.substring(startIndex, endIndex + 1);

            const aiMatches = JSON.parse(responseText);
            const matchedTitles = aiMatches.map(match => match.ideaTitle);
            const finalIdeas = allIdeas.filter(idea => matchedTitles.includes(idea.title));

            if (finalIdeas.length === 0) throw new Error("AI matches not found in DB");

            const customizedIdeas = finalIdeas.map(idea => {
                const aiData = aiMatches.find(match => match.ideaTitle === idea.title);
                return { ...idea, aiReasoning: aiData ? aiData.matchReason : "Matched by AI based on your profile." };
            });
            return res.status(200).json({ recommendations: customizedIdeas });

        } catch (aiError) {
            console.log("🚨 Google AI Failed for Recommendations. Activating Smart JS Algorithm...");
            return res.status(200).json({ recommendations: smartFallbackMatch() });
        }

    } catch (error) {
        console.error("Main Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// 🔥 UNBREAKABLE ROADMAP GENERATOR 🔥
const generateRoadmap = async (req, res) => {
    try {
        const { goal, userId } = req.body; 

        if (!goal || !userId) {
            return res.status(400).json({ success: false, message: "Goal and User ID are required." });
        }

        let roadmapData;

        try {
            // Plan A: Try asking Google Gemini
            const prompt = `Act as an expert career and business mentor. The user wants to achieve this goal: "${goal}". Create a highly detailed, realistic, and strictly 5-step roadmap to achieve this goal. Return ONLY a valid JSON object with the following exact structure, with no markdown formatting or backticks:
            { "title": "Roadmap to ${goal}", "steps": [ { "stepNumber": 1, "title": "Clear Step Title", "description": "Detailed description.", "estimatedTime": "2 weeks", "resources": ["Resource 1"] } ] } Ensure there are exactly 5 steps in the array.`;

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            let responseText = result.response.text();

            responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const startIndex = responseText.indexOf('{');
            const endIndex = responseText.lastIndexOf('}');
            if (startIndex !== -1 && endIndex !== -1) responseText = responseText.substring(startIndex, endIndex + 1);

            roadmapData = JSON.parse(responseText);

        } catch (geminiError) {
            console.error("🚨 Gemini API Failed for Roadmap. Generating Unbreakable Fallback Roadmap...", geminiError.message);
            
            // Plan B: UNBREAKABLE FALLBACK (Agar Gemini fail hua, toh UI kabhi crash nahi hoga)
            roadmapData = {
                title: `Roadmap to ${goal}`,
                steps: [
                    { stepNumber: 1, title: "Research & Foundation", description: `Start by deeply researching about ${goal}. Understand the market, basic concepts, and necessary tools required to start.`, estimatedTime: "1-2 Weeks", resources: ["YouTube Crash Courses", "Industry Blogs"] },
                    { stepNumber: 2, title: "Skill Development & Practice", description: "Gain hands-on experience. Build small real-world projects or practice the core skills continuously.", estimatedTime: "3-4 Weeks", resources: ["Online Tutorials", "Practice Platforms"] },
                    { stepNumber: 3, title: "Build Your Core Asset", description: `Create your main project, portfolio, or MVP (Minimum Viable Product) related to ${goal}.`, estimatedTime: "1 Month", resources: ["Essential Software Tools", "Community Forums"] },
                    { stepNumber: 4, title: "Testing & Feedback", description: "Show your work to mentors or a small audience. Gather harsh feedback and improve your weak points.", estimatedTime: "2 Weeks", resources: ["EntreSkill Mentors", "Peer Review"] },
                    { stepNumber: 5, title: "Launch & Scale", description: "Launch officially! Market your skills or product, stay consistent, and keep updating based on trends.", estimatedTime: "Ongoing", resources: ["Social Media Marketing", "Networking Groups"] }
                ]
            };
        }

        // Save to Database (Works for both Plan A and Plan B)
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
        console.error("Critical Roadmap DB Error:", error);
        res.status(500).json({ success: false, message: "Server error while saving roadmap." });
    }
};

module.exports = { 
    getAIRecommendations, 
    generateRoadmap 
};