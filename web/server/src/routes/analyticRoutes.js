const express = require('express');
const analyticController = require('../controllers/analyticController');
const analyticRouter = express.Router();

analyticRouter.route('/')
    .get(analyticController.getAnalytics)
    .post(analyticController.createAnalytics)
    .put(analyticController.setAnalytics);

module.exports = analyticRouter;