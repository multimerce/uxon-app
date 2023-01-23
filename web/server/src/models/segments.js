const mongoose = require('mongoose');
const {SEGMENT_STATUSES} = require('../constants/modelValues');

const SegmentSchema = new mongoose.Schema(
    {
        shopName: String,
        name: String,
        conditions: Array,
        status: {
            type: String,
            enum: SEGMENT_STATUSES,
            default: SEGMENT_STATUSES[1],
        },
        createdAt: Date,
    },
    { versionKey: false },
);

module.exports = mongoose.model('Segments', SegmentSchema);
