const { Resend } = require('resend');

const sendSupportEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please fill all fields' });
        }

        // Initialize Resend API (Render env se key lega)
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Real API Call (Bina SMTP block ke)
        const { data, error } = await resend.emails.send({
            from: 'EntreSkill System <onboarding@resend.dev>', // Resend ka default sender
            to: process.env.EMAIL_USER, // Yeh wahi email hona chahiye jis se tumne Resend par login kiya hai
            replyTo: email, // Jab tum reply dabaoge toh seedha user ko jayega
            subject: `🚨 New Support Ticket from ${name} | EntreSkill`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                    <h2 style="color: #6d28d9; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">New Support Request</h2>
                    <p style="font-size: 16px;"><strong>User Name:</strong> ${name}</p>
                    <p style="font-size: 16px;"><strong>User Email:</strong> ${email}</p>
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <p style="font-size: 14px; color: #64748b; margin-top: 0;">Message / Issue:</p>
                        <p style="font-size: 16px; color: #0f172a; white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="font-size: 12px; color: #94a3b8; margin-top: 30px; text-align: center;">Powered by Resend API</p>
                </div>
            `
        });

        if (error) {
            console.error('Resend API Error:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email via API.' });
        }

        res.status(200).json({ success: true, message: 'Support ticket sent successfully!' });

    } catch (error) {
        console.error('Server Catch Error:', error);
        res.status(500).json({ success: false, message: 'Server failed to process email.' });
    }
};

module.exports = { sendSupportEmail };