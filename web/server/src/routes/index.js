const express = require('express');

const userRoutes = require('./userRoutes');

const routes = express.Router();

/** Private routes */
routes.use('/user', userRoutes);

/** Public routes */

module.exports = routes;