const express = require('express');

const userRoutes = require('./userRoutes');
const segmentRoutes = require('./segmentRoutes');

const routes = express.Router();

/** Private routes */
routes.use('/user', userRoutes);
routes.use('/segments', segmentRoutes);

/** Public routes */

module.exports = routes;