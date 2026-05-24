const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const aiRoutes = require('./routes/aiRoutes');

// .env file se secret variables load karna
dotenv.config();

// Database se connect karna
connectDB();

const app = express();

// Middleware setup - 👇 YAHAN MAINE CORS KO UPDATE KAR DIYA HAI
app.use(cors({
  origin: ["http://localhost:5173", "https://entreskill-hub-teal.vercel.app"],
  credentials: true
}));
app.use(express.json());

// Routes Links
const authRoutes = require('./routes/authRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes'); 
const bookmarkRoutes = require('./routes/bookmarkRoutes'); // 👇 NAYA CODE: Bookmark routes ko import kiya

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/recommendations', recommendationRoutes); 
app.use('/api/bookmarks', bookmarkRoutes); // 👇 NAYA CODE: Bookmark API ka endpoint set kar diya

// Basic test route
app.get('/', (req, res) => {
    res.send('EntreSkill Hub API is running perfectly! 🚀');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});