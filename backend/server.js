const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// .env file se secret variables load karna
dotenv.config();

// Database se connect karna
connectDB();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes Links
const authRoutes = require('./routes/authRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes'); 
const bookmarkRoutes = require('./routes/bookmarkRoutes'); // 👇 NAYA CODE: Bookmark routes ko import kiya

app.use('/api/auth', authRoutes);
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