const Users = require('../models/user');
const {
    ERROR_MESSAGES: {
        USER_NOT_EXIST, VALIDATE_ERROR,
    }
} = require('../constants/commonConstants');

const checkUser = async (req, res, next) => {
    try {
        const user = await Users.exists({ myShopifyDomain: req.body.shop });

        if (!user) {
            return res.status(404).json({ status: 'error', message: USER_NOT_EXIST });
        }

        next();
    } catch (err) {
        res.status(400).json({status: 'error', message: VALIDATE_ERROR});
    }
};