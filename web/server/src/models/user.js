const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        myShopifyDomain: String,
        accessToken: String,
        domain: String,
        shopName: String,
        name: String,
        email: String,
        country: String,
        currency: String,
        moneyFormat: String,
        isActive: {
            type: String,
            default: false,
        },
        createdAt: Date,
    },
    { versionKey: false },
);

module.exports = mongoose.model('Users', UserSchema);
