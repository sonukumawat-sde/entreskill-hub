const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // process.env.MONGO_URI humari .env file se database ka link uthayega
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error aayi hai DB connection mein: ${error.message}`);
        process.exit(1); // Agar error aayi toh server band kar denge
    }
};

module.exports = connectDB;