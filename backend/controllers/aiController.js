const { GoogleGenerativeAI } = require('@google/generative-ai');
const BusinessIdea = require('../models/BusinessIdea');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAIRecommendations = async (req, res) => {
    try {
        const { skills, investmentLevel } = req.body;
        const allIdeas = await BusinessIdea.find().lean();

        if (!allIdeas || allIdeas.length === 0) {
            return res.status(200).json({ recommendations: [] });
        }

        // 🔥 THE SMART JAVASCRIPT MATCHING ALGORITHM (No Google dependency) 🔥
        const smartFallbackMatch = () => {
            if (!skills || skills.length === 0) return allIdeas.slice(0, 3);

            // User ki skills ko lowercase mein convert karo
            const userSkillsLower = skills.map(s => s.toLowerCase().trim());

            // Database ke ideas ko filter karo
            let matchedIdeas = allIdeas.filter(idea => {
                if (!idea.requiredSkills) return false;
                const ideaSkillsLower = idea.requiredSkills.map(s => s.toLowerCase().trim());
                // Check karo agar idea ki skill aur user ki skill match hoti hai
                return ideaSkillsLower.some(skill => userSkillsLower.includes(skill));
            });

            // Agar exact match na mile, toh default ideas dedo
            if (matchedIdeas.length === 0) {
                matchedIdeas = allIdeas;
            }

            // Top 3 matched ideas return karo with custom reason
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

            // Using stable pro model
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            let responseText = result.response.text();

            // Clean JSON
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
            // 🚀 PLAN B: AGAR GOOGLE FAIL HUA, TOH HAMARA SMART FILTER CHALEGA
            return res.status(200).json({ recommendations: smartFallbackMatch() });
        }

    } catch (error) {
        console.error("Main Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getAIRecommendations };