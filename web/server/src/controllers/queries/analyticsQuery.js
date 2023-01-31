const Analytics = require('../../models/analytics');

module.exports.setAnalytics = async (shop, segmentId, createdAt, updateData) => {
    try {
        await Analytics.findOneAndUpdate({ shopName: shop, segmentId, createdAt }, updateData, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            useFindAndModify: false,
        });
    } catch (err) {
        throw new Error(err);
    }
};
