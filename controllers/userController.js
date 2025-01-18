const User = require('../models/user');

// Get user info
exports.getUserInfo = async (req, res) => {
    const { userId } = req.params;
    const username = req.session.user;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user data', error: err.message });
    }
};