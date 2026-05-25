const { GoogleGenerativeAI } = require('@google/generative-ai');

const systemPrompt = `You are a helpful, professional, and highly intelligent support assistant for 'EntreSkill', a platform that helps users with business roadmaps, skill building, and mentorship. Answer any questions the user asks clearly, accurately, and with a friendly tone. If they ask a coding or technical doubt, explain it perfectly like a senior developer.`;

const handleAIChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Please write a message.' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const fullPrompt = `${systemPrompt}\n\nUser Question: ${message}\n\nProvide a clear and helpful response:`;
        
        const result = await model.generateContent(fullPrompt);
        const aiResponse = result.response.text();

        res.status(200).json({ success: true, reply: aiResponse });

    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ success: false, reply: 'Sorry, my AI brain is currently upgrading. Please try again in a minute!' });
    }
};

// YAHAN EXPORT EKDUM SAHI HONA CHAHIYE
module.exports = { handleAIChat };