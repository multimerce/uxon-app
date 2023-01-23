const mongoose = require('mongoose');

const ShopifySessionsSchema = new mongoose.Schema(
    {
        id: String,
        shop: String,
        state: String,
        isOnline: Boolean,
        scope: String,
        accessToken: String,
    },
    { versionKey: false }
);

module.exports = mongoose.model('shopify_sessions', ShopifySessionsSchema)