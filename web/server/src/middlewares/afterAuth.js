const shopify = require('../config/shopify/shopifyConfig');
const Users = require('../models/user');

module.exports.afterAuth = async (req, res, next) => {
    try {
        const { shop = '' } = req.query;

        const isUserExist = await Users.exists({ myShopifyDomain: shop });

        if (!isUserExist) {
            const fetchedShop = await shopify.api.rest.Shop.all({
                session: res.locals.shopify.session,
                fields: 'name,email,domain,country,currency,shop_owner,money_format,myshopify_domain'
            });

            const { name, email, domain, country, currency, shop_owner, money_format, myshopify_domain, session } = fetchedShop[0];
            const createdData = {
                myShopifyDomain: myshopify_domain,
                accessToken: session.accessToken,
                domain: domain,
                shopName: name,
                name: shop_owner,
                email: email,
                country: country,
                currency: currency,
                moneyFormat: money_format,
                isActive: true,
                createdAt: new Date(),
            };

            await Users.create(createdData);
        }

        next();
    } catch (err) {
        res.status(err.statusCode).json({ message: '...'});
    }
};

module.exports.refreshAccessToken = async (req, res, next) => {
    try {
        next();
    } catch (err) {
        res.status(err.statusCode).json({ message: '...'});
    }
};