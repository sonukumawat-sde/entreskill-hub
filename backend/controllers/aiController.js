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

        if (!skills || skills.length === 0) {
            return res.status(200).json({ recommendations: allIdeas.slice(0, 3) });
        }

        try {
            // Sirf titles bhejenge taaki prompt chhota aur fast rahe
            const ideaContext = allIdeas.map(idea => idea.title).join(", ");

            const prompt = `
            You are an expert Business Mentor. 
            User skills: ${skills.join(', ')}. 
            Budget: ${investmentLevel || 'Any'}.
            Available ideas to choose from: ${ideaContext}.
            
            Task: Select exactly 3 ideas from the available list that best match the user's skills.
            Return a pure JSON array of objects.
            Format: [{"ideaTitle": "Exact Title Here", "matchReason": "Short personalized reason why this fits their skills"}]
            `;

            // 🔥 NATIVE JSON MODE (No aggressive cleaners needed anymore) 🔥
            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash",
                generationConfig: {
                    responseMimeType: "application/json",
                }
            });

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            
            // Because of responseMimeType, this is 100% guaranteed to be a valid JSON string
            const aiMatches = JSON.parse(responseText);

            const matchedTitles = aiMatches.map(match => match.ideaTitle);
            const finalIdeas = allIdeas.filter(idea => matchedTitles.includes(idea.title));

            const customizedIdeas = finalIdeas.map(idea => {
                const aiData = aiMatches.find(match => match.ideaTitle === idea.title);
                return {
                    ...idea,
                    aiReasoning: aiData ? aiData.matchReason : "Matched perfectly with your skills."
                };
            });

            // 🚀 SUCCESS: Bhej do asli AI recommendations!
            return res.status(200).json({ recommendations: customizedIdeas });

        } catch (aiError) {
            console.error("🚨 GEMINI AI CRASHED. Reason:", aiError);
            // Fallback: Agar kisi bhi wajah se error aaye, toh sirf pehle 3 ideas dikhao taaki pata chale ki fallback chal raha hai.
            return res.status(200).json({ recommendations: allIdeas.slice(0, 3) });
        }

    } catch (error) {
        console.error("Main Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getAIRecommendations };