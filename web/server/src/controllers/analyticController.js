const {addSeconds, format} = require('date-fns');
const Analytics = require('../models/analytics');
const {getCommonAnalytics} = require('../services/analyticsServices');
const {setAnalytics} = require('./queries/analyticsQuery');
const {
    ERROR_MESSAGES: {
        CREATE_FAILED, FETCH_FAILED,
    },
    DAY_IN_SECONDS,
} = require('../constants/commonConstants');

module.exports.getAnalytics = async (req, res) => {
    try {
        // const {shop} = req.session;
        const shop = 'uxondev.myshopify.com';

        // const shop = "uxondev.myshopify.com";


        const {dateStart = '', dateEnd = ''} = req.query;

        const filter = {shopName: shop};

        let dateStartISO;
        let dateEndISO;

        if (!!dateStart && !!dateEnd) {
            dateEndISO = new Date(dateEnd);
            dateStartISO = new Date(dateStart);

            filter.createdAt = {
                $gte: dateStartISO,
                $lte: addSeconds(dateEndISO, DAY_IN_SECONDS),
            };
        }

        const fetchedAnalytics = await Analytics.aggregate([
            {
                $match: {...filter},
            },
            {
                $group: {
                    _id: {segmentId: '$segmentId'},
                    revenue: {$sum: '$revenue'},
                    interactions: {$sum: '$interactions'},
                }
            },
            {
                $lookup: {
                    from: 'segments',
                    let: {
                        segmentId: '$_id.segmentId',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [{"$toObjectId": '$$segmentId'}, '$_id'],
                                },
                            },
                        },
                        {
                            $project: {name: 1, _id: 0},
                        },
                    ],
                    as: 'segments',
                },
            },
            {
                $unwind: '$segments',
            },
        ])
            .sort({ revenue: -1 });
        // .skip(skip);

        //TODO: need to refactor preparedAnalytics, move to aggregate
        const preparedAnalytics = fetchedAnalytics.map((item) => {
            return {
                ...item,
                _id: item._id.segmentId,
                segments: item.segments.name || '',
            }
        })

        let commonAnalytics = {};
        if (fetchedAnalytics.length > 0) {
            commonAnalytics = getCommonAnalytics(fetchedAnalytics);
        }

        return res.status(200).json({
            status: 'success',
            data: {
                fetchedAnalytics: preparedAnalytics,
                commonAnalytics,
            },
        });
    } catch (err) {
        res.status(400).json({status: 'error', message: `${FETCH_FAILED}: ${err}`});
    }
};

module.exports.createAnalytics = async (req, res) => {
    try {
        const {shop} = req.session;
        const {analyticsData = {}} = req.body
        const createdData = {
            ...analyticsData,
            shopName: shop,
            createdAt: format(new Date(), 'yyyy-MM-dd'),
        };

        const createdAnalytics = await Analytics.create(createdData);

        if (createdAnalytics) {
            return res.status(200).json({status: 'success', data: createdAnalytics});
        }
        res.status(404).json({status: 'error', message: CREATE_FAILED});
    } catch (err) {
        res.status(400).json({status: 'error', message: `${CREATE_FAILED}: ${err}`});
    }
};

module.exports.setAnalytics = async (req, res) => {
    try {
        const {segmentId, shop, dataForUpdate} = req.body;

        const createdAt = format(new Date(), 'yyyy-MM-dd');
        const updateData = { $inc: { ...dataForUpdate } };

        await setAnalytics(shop, segmentId, createdAt, updateData);

        res.status(200).json({ status: 'success' });
    } catch (err) {
        res.status(400).json({status: 'error', message: `${CREATE_FAILED}: ${err}`});
    }
};