const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referred_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    direct_referral: { type: Number, default: 0 },
    indirect_referral: { type: Number, default: 0 },
    refer_count: { type: Number, default: 0 },
    level: { type: Number, required: true, default: 1 },  // added field
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
