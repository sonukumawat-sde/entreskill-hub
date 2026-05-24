const { GoogleGenerativeAI } = require('@google/generative-ai');
const BusinessIdea = require('../models/BusinessIdea');

// Initialize Gemini with your API Key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAIRecommendations = async (req, res) => {
    try {
        const { skills, investmentLevel } = req.body;

        // Validation check
        if (!skills || skills.length === 0) {
            return res.status(400).json({ message: "Please provide your skills for AI matching." });
        }

        // 1. Fetch all business ideas from our database to show to Gemini
        const allIdeas = await BusinessIdea.find().select('title category requiredSkills investmentLevel');

        // 2. Write a strict Prompt for Gemini AI
        const prompt = `
        You are an expert Business Mentor for a platform called EntreSkill.
        A user has the following profile:
        - Skills: ${skills.join(', ')}
        - Budget/Investment capacity: ${investmentLevel || 'Any'}

        Here is the list of available business ideas in our database:
        ${JSON.stringify(allIdeas)}

        Task: Select exactly the top 3 business ideas from this list that BEST match the user's profile.
        Write a personalized 1-2 sentence reason for EACH selected idea explaining WHY it's a good fit for them.

        CRITICAL REQUIREMENT: You MUST return the result as a valid JSON array of objects. 
        Do NOT include any other text, markdown formatting, or code blocks like \`\`\`json. 
        Format exactly like this:
        [
          {
            "ideaTitle": "Exact Title of the idea from the list",
            "matchReason": "Your personalized reasoning here."
          }
        ]
        `;

        // 3. Call the Gemini Model (🔥 100% STABLE 'gemini-pro' ENGINE 🔥)
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        let responseText = result.response.text();

        // 4. Clean the response to ensure it's valid JSON
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiMatches = JSON.parse(responseText);

        // 5. Fetch the full roadmaps and details from the database using AI's selected titles
        const matchedTitles = aiMatches.map(match => match.ideaTitle);
        const finalIdeas = await BusinessIdea.find({ title: { $in: matchedTitles } }).lean();

        // 6. Merge AI's custom reasoning with the original database ideas
        const customizedIdeas = finalIdeas.map(idea => {
            const aiData = aiMatches.find(match => match.ideaTitle === idea.title);
            return {
                ...idea,
                aiReasoning: aiData ? aiData.matchReason : "This is a great match based on your profile."
            };
        });

        // Send the final result back to the frontend
        res.status(200).json({
            message: "AI has successfully generated your personalized recommendations!",
            recommendations: customizedIdeas
        });

    } catch (error) {
        console.error("AI Recommendation Error:", error);
        res.status(500).json({ 
            message: "AI is currently taking a coffee break. Please try again later.", 
            error: error.message 
        });
    }
};

module.exports = { getAIRecommendations };