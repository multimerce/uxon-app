const { URL } = require("url");
const { LATEST_API_VERSION } = require("@shopify/shopify-api");
const { shopifyApp } = require("@shopify/shopify-app-express");
const { MongoDBSessionStorage } = require('@shopify/shopify-app-session-storage-mongodb');
const { restResources } = require(`@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`);

const shopify = shopifyApp({
    api: {
        apiVersion: LATEST_API_VERSION,
        apiKey: process.env.SHOPIFY_API_KEY,
        apiSecretKey: process.env.SHOPIFY_API_SECRET,
        scopes: [`${process.env.SCOPES}`],
        isEmbeddedApp: true,
        hostName: process.env.HOST?.replace(/https:\/\//, '') || '',
        restResources,
        billing: undefined, // or replace with billingConfig above to enable example billing
    },
    auth: {
        path: "/api/v1/auth",
        callbackPath: "/api/auth/callback",
    },
    webhooks: {
        path: "/api/v1/webhooks",
    },
    sessionStorage: new MongoDBSessionStorage(new URL(`${process.env.MONGO_CONNECTION_URL}`), `${process.env.MONGO_DATABASE}`),
});

module.exports = shopify;