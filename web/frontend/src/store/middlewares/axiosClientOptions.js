import axios from 'axios';
import {createApp} from '@shopify/app-bridge';
import {getSessionToken} from '@shopify/app-bridge-utils';

const baseApiURL = `${process.env.HOST}/api/v1`;

export const axiosClientOptions = () => {
    const host = new URLSearchParams(window.location.search).get("host");

    const appConfig = createApp({
        apiKey: process.env.SHOPIFY_API_KEY,
        host,
    });

    const setSessionToken = async (_, req) => {
        const sessionToken = await getSessionToken(appConfig);
        req.headers['Authorization'] = `Bearer ${sessionToken}`;
        return req;
    };

    const client = axios.create({
        baseURL: baseApiURL,
        maxContentLength: 50000,
        timeout: 60000,
        responseType: 'json',
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
        },
    });

    const options = {
        interceptors: {
            request: [setSessionToken],
        },
    };

    return {
        client,
        options,
    };
};