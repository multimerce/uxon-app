import {createRequestAction} from '../common';

const PREFIX = 'ANALYTICS';

export const fetchAnalyticsAction = createRequestAction(`${PREFIX}/FETCH_ANALYTICS`, (params) => ({
    request: {
        url: '/analytics',
        params,
    },
}));
