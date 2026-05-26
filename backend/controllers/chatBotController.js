const { GoogleGenerativeAI } = require('@google/generative-ai');

const systemPrompt = `You are a helpful, professional, and highly intelligent support assistant for 'EntreSkill', a platform that helps users with business roadmaps, skill building, and mentorship. Answer any questions the user asks clearly, accurately, and with a friendly tone.`;

const handleAIChat = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Please write a message.' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // 🔥 THE ULTIMATE FIX: Changed to universal 'gemini-pro' model. 
        // Yeh kabhi 404 Not Found nahi dega.
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Bulletproof Memory Logic
        let fullConversation = systemPrompt + "\n\n--- Conversation History ---\n";

        if (history && Array.isArray(history)) {
            history.forEach(msg => {
                if (msg.text === 'Hi! I am the EntreSkill AI Assistant. Ask me any coding doubt or platform question!') {
                    return;
                }
                const senderName = msg.sender === 'user' ? 'User' : 'EntreSkill AI';
                fullConversation += `${senderName}: ${msg.text}\n`;
            });
        }

        fullConversation += `User: ${message}\nEntreSkill AI:`;

        const result = await model.generateContent(fullConversation);
        const aiResponse = result.response.text();

        res.status(200).json({ success: true, reply: aiResponse });

    } catch (error) {
        console.error('AI Chat Error (Render Logs):', error);
        res.status(500).json({ success: false, reply: 'System error. Check backend logs for API key or connection issues.' });
    }
};

module.exports = { handleAIChat };