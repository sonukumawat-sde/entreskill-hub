const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

// User ka schema (dancha) banate hain
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Naam dalna zaroori hai'], 
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email dalna zaroori hai'],
            unique: true, 
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please ek valid email address dalein'
            ]
        },
        password: {
            type: String,
            required: [true, 'Password dalna zaroori hai'],
            minlength: [6, 'Password kam se kam 6 characters ka hona chahiye'],
            select: false 
        },
        role: {
            type: String,
            enum: ['user', 'mentor', 'admin'], 
            default: 'user', 
        },
        skills: {
            type: [String], 
            default: [],
        },
        budget: {
            type: String,
            default: '',
        },
        timeCommitment: {
            type: String,
            default: '',
        },
        isOnboarded: {
            type: Boolean,
            default: false, 
        },
        // 👇 Bookmarking field (Array of objects)
        bookmarkedIdeas: {
            type: Array, 
            default: []
        },
        // 🔥 FUTURE-PROOFING FIELDS: Dashboard UI ke hisaab se
        mentorCredits: {
            type: Number,
            default: 2 // Dashboard par '02 Sessions Left' show karne ke liye
        },
        streak: {
            type: Number,
            default: 1 // Default daily streak count
        }
    },
    {
        timestamps: true, 
    }
);

// 🚀 MIDDLEWARE: Password Hashing (100% ERROR-FREE)
// Notice: Yahan 'next' parameter bilkul hata diya hai kyunki hum 'async' use kar rahe hain
userSchema.pre('save', async function () {
    // Agar password modify nahi hua (jaise sirf bookmark add kiya), toh process yahin rok do
    if (!this.isModified('password')) {
        return; 
    }
    
    // Naya password hash (encrypt) karo
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// 🚀 METHOD: Password check login ke time
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;