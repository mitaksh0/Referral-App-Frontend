const { calculateReferralEarnings } = require('../services/referralService');  // Assuming this function is used for calculations
const Transaction = require('../models/transaction');
const User = require('../models/user');

exports.purchase = async (req, res) => {
    // console.log(req.body);
    const { userId, amount } = req.body;
    // if (amount < 1000) {
    //     return res.status(400).json({ message: 'Purchase amount must be at least ₹1000 to trigger referral earnings' });
    // }

    try {
        // Find the user making the purchase and populate their parent information
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Record the purchase transaction
        const transaction = new Transaction({ user_id: userId, amount });
        await transaction.save();
        // 1000 threshold
        if (amount >= 1000) {
            // Calculate the earnings for the referrers (parent and grandparent)
            const earnings = await calculateReferralEarnings(amount);
    
            // Update earnings for parent (5%) and grandparent (1%)
            const parentReferBy = user.referred_by;
            const parentUser = await User.findById(parentReferBy)
            if (parentUser) {
                parentUser.direct_referral += earnings.directEarnings;
                await parentUser.save();
                req.app.io.emit('referralUpdate', { userId: parentUser._id, earnings: { directEarnings: parentUser.direct_referral, indirectEarnings: parentUser.indirect_referral } });
                
                const grandParentReferBy = parentUser.referred_by;
                const grandparentUser = await User.findById(grandParentReferBy)
                if (grandparentUser) {
                    grandparentUser.indirect_referral += earnings.indirectEarnings;
                    await grandparentUser.save();
                    req.app.io.emit('referralUpdate', { userId: grandparentUser._id, earnings: { directEarnings: grandparentUser.direct_referral, indirectEarnings: grandparentUser.indirect_referral } });
                }
            }
    
        }
        // Respond with a success message, but without showing earnings to the purchaser
        res.status(200).json({ message: 'Purchase successful. Earnings credited to referrers.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error processing purchase', error: err.message });
    }
};
