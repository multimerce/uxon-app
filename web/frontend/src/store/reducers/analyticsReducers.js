import {combineActions, handleActions} from 'redux-actions';
import get from 'lodash/get';

import {fetchAnalyticsAction} from '../actions';

const initialState = {
    error: false,
    isLoading: false,
    data: {
        fetchedAnalytics: [],
        commonAnalytics: {},
    },
};

const fetchAnalyticsSuccessHandler = (state, {payload}) => {
    const data = get(payload, 'data.data', {});

    return {
        ...state,
        data,
        isLoading: false,
    };
};

const fetchAnalyticsFailHandler = (state, {error}) => ({
    ...state,
    error: true,
    isLoading: false,
});

const requestHandler = (state) => ({
    ...state,
    error: false,
    isLoading: true,
});

export const analytics = handleActions(
    {
        [combineActions(fetchAnalyticsAction)]: requestHandler,

        [fetchAnalyticsAction.success]: fetchAnalyticsSuccessHandler,
        [fetchAnalyticsAction.fail]: fetchAnalyticsFailHandler,
    },
    initialState,
);