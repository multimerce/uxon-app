const express = require('express');

const userRoutes = require('./userRoutes');
const segmentRoutes = require('./segmentRoutes');
const analyticRoutes = require('./analyticRoutes');

const routes = express.Router();

/** Private routes */
routes.use('/user', userRoutes);
routes.use('/segments', segmentRoutes);
routes.use('/analytics', analyticRoutes);

/** Public routes */

module.exports = routes;