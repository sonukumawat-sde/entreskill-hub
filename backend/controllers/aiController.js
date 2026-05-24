const { GoogleGenerativeAI } = require('@google/generative-ai');
const BusinessIdea = require('../models/BusinessIdea');

// Initialize Gemini with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAIRecommendations = async (req, res) => {
    try {
        const { skills, investmentLevel } = req.body;

        // 1. Database se saare ideas nikal lo
        const allIdeas = await BusinessIdea.find().lean();

        // Agar DB khali hai, toh crash hone se bachao
        if (!allIdeas || allIdeas.length === 0) {
            return res.status(200).json({ recommendations: [] });
        }

        // Agar user ke paas skills nahi hain, toh direct purane ideas bhej do
        if (!skills || skills.length === 0) {
            return res.status(200).json({ recommendations: allIdeas });
        }

        // 2. AI MATCHING KI KOSHISH (Plan A)
        try {
            const prompt = `
            You are an expert Business Mentor. 
            User skills: ${skills.join(', ')}. 
            Budget: ${investmentLevel || 'Any'}.
            Available ideas: ${JSON.stringify(allIdeas)}
            
            Task: Select exactly top 3 matching ideas. Return ONLY a valid JSON array.
            Format: [{"ideaTitle": "Exact Title Here", "matchReason": "Reasoning here"}]
            `;

            // 🔥 LATEST PACKAGE KE SATH LATEST MODEL 🔥
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            let responseText = result.response.text();
            
            // Clean JSON string
            responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const aiMatches = JSON.parse(responseText);

            const matchedTitles = aiMatches.map(match => match.ideaTitle);
            const finalIdeas = allIdeas.filter(idea => matchedTitles.includes(idea.title));

            const customizedIdeas = finalIdeas.map(idea => {
                const aiData = aiMatches.find(match => match.ideaTitle === idea.title);
                return {
                    ...idea,
                    aiReasoning: aiData ? aiData.matchReason : "Great match based on your profile."
                };
            });

            // Agar AI successful raha, toh AI wale ideas bhejo
            return res.status(200).json({ recommendations: customizedIdeas });

        } catch (aiError) {
            // 🔥 THE BULLETPROOF SHIELD (Plan B) 🔥
            console.error("🚨 GOOGLE AI ERROR (Ignored, using Plan B):", aiError);
            return res.status(200).json({ recommendations: allIdeas });
        }

    } catch (error) {
        console.error("Main Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getAIRecommendations };