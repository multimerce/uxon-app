const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema(
    {
        shopName: String,
        segmentId: String,
        revenue: {
            type: Number,
            default: 0,
        },
        interactions: {
            type: Number,
            default: 0,
        },
        createdAt: Date,
    },
    { versionKey: false },
);

module.exports = mongoose.model('Analytics', AnalyticsSchema);
