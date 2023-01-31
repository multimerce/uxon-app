const mongoose = require('mongoose');

const CustomersSchema = new mongoose.Schema(
    {
        name: String,
        customerId: String,
        segmentId: String,
        createdAt: Date,
    },
    { versionKey: false },
);

module.exports = mongoose.model('Customers', CustomersSchema);