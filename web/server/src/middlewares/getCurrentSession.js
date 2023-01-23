const ShopifySessions = require('../models/shopifySessions');
const shopify = require('../config/shopify/shopifyConfig');

module.exports.getSessionMiddleware = async (req, res, next) => {
    try {
        const headerToken = req.get('Authorization');
        if (headerToken) {
            const token = headerToken.split(' ')[1];

            const decodedToken = await shopify.api.session.decodeSessionToken(token)
                .catch(() => {
                    return res.status(401).json({
                        status: 'error',
                        message: "Token can't be verified",
                    });
                });

            const shop = decodedToken?.dest?.replace("https://", "");

            req.session = await ShopifySessions.findOne({shop});
        }
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            message: "Error while get session",
        });
    }
    finally {
        next();
    }
};
