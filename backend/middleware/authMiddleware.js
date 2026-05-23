const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check karte hain ki request ke headers mein 'Authorization' aur 'Bearer' token hai ya nahi
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Token ko 'Bearer ' text se alag karke nikalna
            token = req.headers.authorization.split(' ')[1];

            // Token ko decode aur verify karna using hamari secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Token se user ki ID nikal kar database se user dhundhna
            // .select('-password') lagaya taaki password galti se bhi aage pass na ho
            req.user = await User.findById(decoded.userId).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'User nahi mila, token invalid hai' });
            }

            // Sab kuch theek hai, user ko aage badhne do
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            // Agar token expire ho gaya ho ya galat ho
            return res.status(401).json({ message: 'Not authorized, token fail ho gaya' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, koi token nahi mila' });
    }
};

// Agar features ko sirf 'Admin' ya 'Mentor' ke liye restrict karna ho toh yeh kaam aayega
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Role (${req.user.role}) is action ko perform karne ke liye allowed nahi hai` 
            });
        }
        next();
    };
};

module.exports = { protect, authorizeRoles };