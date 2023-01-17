const path = require('path');
const express = require('express');
const { readFileSync } = require('fs');
const serveStatic = require('serve-static');
const routes = require('../../routes');
const shopify = require('../shopify/shopifyConfig');
const { afterAuth, refreshAccessToken } = require('../../middlewares/afterAuth');
// const GDPRWebhookHandlers = require('../../../gdpr');

const expressConfig = express();

const STATIC_PATH =
    process.env.NODE_ENV === "production"
        ? `${path.resolve(__dirname, '../../../..', 'frontend/dist')}`
        : `${path.resolve(__dirname, '../../../..', 'frontend')}`;

/** Set up Shopify authentication and webhook handling */
expressConfig.get(shopify.config.auth.path, refreshAccessToken, shopify.auth.begin());

expressConfig.get(
    shopify.config.auth.callbackPath,
    shopify.auth.callback(),
    afterAuth,
    shopify.redirectToShopifyOrAppRoot()
);

// expressConfig.post(
//     shopify.config.webhooks.path,
//     shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
// );

expressConfig.use('/api/*', shopify.validateAuthenticatedSession());

expressConfig.use(express.json());

expressConfig.use('api/v1', routes);

expressConfig.use(serveStatic(STATIC_PATH, { index: false }));

expressConfig.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
    return res
        .status(200)
        .set("Content-Type", "text/html")
        .send(readFileSync(path.join(STATIC_PATH, "index.html")));
});

module.exports = expressConfig;