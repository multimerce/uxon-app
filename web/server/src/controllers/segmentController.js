const Segments = require('../models/segments');

module.exports.createSegment = async (req, res) => {
    try {
        const { shop } = req.session;
        const createdData = {
            ...req.body.segmentData,
            shopName: shop,
            createdAt: new Date(),
        };

        const createdSegment = await Segments.create(createdData);

        if (createdSegment) {
            return res.status(200).json({ status: 'success', data: createdSegment });
        }
        res.status(404).json({ status: 'error', message: 'ERROR_MESSAGES.CREATE_FAILED' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: 'ERROR_MESSAGES.MISSING_DATA' });
    }
};