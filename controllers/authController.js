const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password, referred_by } = req.body;
    try {
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            var errorResponse = "Email";
            if (userExists.username == username) {
                errorResponse = "Username";
            }
            return res.status(400).json({ message: `${errorResponse} already in use` });
        }
        
        let parentUser = null;
        if (referred_by) {            
            parentUser = await User.findById(referred_by);
            if (!parentUser) {
                return res.status(400).json({ message: 'Invalid referral ID' });
            } else if (parentUser.refer_count == 8) {
                return res.status(400).json({ message: 'referral limit reached(8)'});
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            referred_by: parentUser ? parentUser._id : null, // Set the referred_by field
            level: parentUser ? parentUser.level + 1 : 1 // Set the level
        });

        // If a parent exists, update the parent user's referral count and referrals array
        if (parentUser) {
            parentUser.refer_count += 1;
            await parentUser.save();
        }

        // Save the new user
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        req.session.user = { username }; 
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        req.session.token = token;
        res.status(200).json({ message: 'Logged in successfully', token, user: user._id });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

// Logout user
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};