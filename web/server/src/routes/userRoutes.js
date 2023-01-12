const express = require('express');

const userRouter = express.Router();

userRouter.route('/:id').get();

module.exports = userRouter;