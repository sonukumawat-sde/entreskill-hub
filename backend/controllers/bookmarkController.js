const User = require('../models/User');

// @desc    Toggle Bookmark (Save or Remove an Idea)
// @route   POST /api/bookmarks/toggle
// @access  Private
exports.toggleBookmark = async (req, res) => {
    try {
        const { idea } = req.body;
        
        // Ensure we get the correct user ID
        const userId = req.user._id || req.user.id; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the idea is already bookmarked
        const isBookmarked = user.bookmarkedIdeas.some((item) => String(item._id) === String(idea._id));

        if (isBookmarked) {
            // 🔥 Mongoose Warning Fixed: Changed `new: true` to `returnDocument: 'after'`
            await User.findByIdAndUpdate(
                userId, 
                { $pull: { bookmarkedIdeas: { _id: idea._id } } },
                { returnDocument: 'after' } 
            );
        } else {
            // 🔥 Mongoose Warning Fixed: Changed `new: true` to `returnDocument: 'after'`
            await User.findByIdAndUpdate(
                userId, 
                { $push: { bookmarkedIdeas: idea } },
                { returnDocument: 'after' }
            );
        }

        // Fetch fresh data to send back to frontend
        const updatedUser = await User.findById(userId);

        res.status(200).json({
            success: true,
            message: isBookmarked ? 'Bookmark removed successfully' : 'Bookmark added successfully',
            bookmarkedIdeas: updatedUser.bookmarkedIdeas
        });

    } catch (error) {
        console.error('Error toggling bookmark:', error);
        res.status(500).json({ success: false, message: 'Server error while processing bookmark' });
    }
};

// @desc    Get all Bookmarked Ideas
// @route   GET /api/bookmarks
// @access  Private
exports.getBookmarks = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            bookmarkedIdeas: user.bookmarkedIdeas
        });

    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching bookmarks' });
    }
};