const mongoose = require('mongoose');
const Segments = require('../models/segments');
const {
    ERROR_MESSAGES: {
        CREATE_FAILED, MISSING_DATA, FETCH_FAILED, UPDATE_FAILED, DUPLICATE_FAILED,
    }
} = require('../constants/commonConstants');

module.exports.createSegment = async (req, res) => {
    try {
        const {shop} = req.session;
        const createdData = {
            ...req.body.segmentData,
            shopName: shop,
            createdAt: new Date(),
        };

        const createdSegment = await Segments.create(createdData);

        if (createdSegment) {
            return res.status(200).json({status: 'success', data: createdSegment});
        }
        res.status(404).json({status: 'error', message: CREATE_FAILED});
    } catch (err) {
        res.status(400).json({status: 'error', message: MISSING_DATA});
    }
};

module.exports.getSegments = async (req, res) => {
    try {
        const {shop} = req.session;
        const {limit, order, page, search, sortBy = 'name'} = req.query;

        const limitBy = limit ? parseInt(limit) : 10;
        const orderBy = order ? parseInt(order) : -1;
        const pageNumber = Math.max(parseInt(page), 1);
        const skip = limit * (page - 1);

        const filter = {shopName: shop};
        if (search) {
            filter.name = new RegExp(`${search.replace(/\\\[\(\)/, '')}`, 'gi');
        }

        const fetchedSegments = await Segments.aggregate([
            {
                $match: {...filter},
            },
        ])
            .sort({[sortBy]: orderBy})
            .skip(skip || 0)
            .limit(limitBy || 10);

        const segmentsTotalCount = await Segments.countDocuments({shopName: shop});

        return res.status(200).json({
            status: 'success',
            data: {
                data: fetchedSegments,
                total: segmentsTotalCount,
                page: pageNumber || 1,
                limit: limitBy,
            },
        });
    } catch (err) {
        res.status(400).json({status: 'error', message: FETCH_FAILED});
    }
};

module.exports.getSegmentById = async (req, res) => {
    try {
        const {shop} = req.session;
        const {id} = req.params;

        const fetchedSegment = await Segments.findOne({_id: mongoose.Types.ObjectId(id), shopName: shop}).lean();

        return res.status(200).json({
            status: 'success',
            data: fetchedSegment,
        });
    } catch (err) {
        res.status(400).json({status: 'error', message: FETCH_FAILED});
    }
};

module.exports.updateSegment = async (req, res) => {
    try {
        const {shop} = req.session;
        const {id} = req.params;
        const {segmentData} = req.body;

        const updatedSegment = await Segments.findOneAndUpdate(
            {_id: mongoose.Types.ObjectId(id), shopName: shop},
            {$set: segmentData},
            {new: true, useFindAndModify: false, upsert: false},
        );

        return res.status(200).json({
            status: 'success',
            data: updatedSegment,
        });
    } catch (err) {
        res.status(400).json({status: 'error', message: UPDATE_FAILED});
    }
};

module.exports.deleteSegment = async (req, res) => {
    try {
        const {shop} = req.session;
        const {id} = req.params;

        const deletedSegment = await Segments.findOneAndRemove({
            _id: mongoose.Types.ObjectId(id),
            shopName: shop
        }, {useFindAndModify: false});

        return res.status(200).json({
            status: 'success',
            data: deletedSegment,
        });
    } catch (err) {
        res.status(400).json({status: 'error', message: FETCH_FAILED});
    }
};

module.exports.duplicateSegment = async (req, res) => {
    try {
        const {shop} = req.session;
        const {id} = req.params;

        const fetchedSegment = await Segments.findOne({
            _id: mongoose.Types.ObjectId(id),
            shopName: shop
        }, {_id: 0}).lean();
        fetchedSegment.createdAt = new Date();
        fetchedSegment.name = `${fetchedSegment.name} (duplicate)`;
        fetchedSegment.status = 'ready';

        const duplicateSegment = await Segments.create(fetchedSegment);

        return res.status(200).json({
            status: 'success',
            data: duplicateSegment,
        });
    } catch (err) {
        res.status(400).json({status: 'error', message: `${DUPLICATE_FAILED}: ${err}`});
    }
};