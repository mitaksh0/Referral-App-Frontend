const User = require('../models/user');

exports.calculateReferralEarnings = (amount) => {
    let directEarnings = 0;
    let indirectEarnings = 0;

    directEarnings = (amount * 0.05);
    indirectEarnings = (amount * 0.01);

    return { directEarnings, indirectEarnings };
};
