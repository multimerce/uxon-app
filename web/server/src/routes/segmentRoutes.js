const express = require('express');
const segmentController = require('../controllers/segmentController');
const segmentRouter = express.Router();

segmentRouter.route('/').get(segmentController.getSegments);
segmentRouter.route('/').post(segmentController.createSegment);
segmentRouter.route('/:id')
    .get(segmentController.getSegmentById)
    .patch(segmentController.updateSegment)
    .delete(segmentController.deleteSegment)
    .post(segmentController.duplicateSegment);

module.exports = segmentRouter;