import {combineActions, handleActions} from 'redux-actions';
import get from 'lodash/get';

import {fetchSegmentAction, createSegmentAction} from '../actions';

const initialState = {
    error: false,
    isLoading: false,
    originSegmentData: null,
    data: {},
};

const fetchSegmentSuccessHandler = (state, {payload}) => {
    const data = {...(payload || {})};

    return {
        ...state,
        data,
        originSegmentData: {...data},
        isLoading: false,
    };
};

const createSegmentSuccessHandler = (state, {payload}) => ({
    ...state,
    data: {
        ...get(state, 'data', {}),
        ...(payload || {}),
    },
    isLoading: false,
});

const fetchSegmentFailHandler = (state, {error}) => ({
    ...state,
    error: true,
    isLoading: false,
});

const createSegmentFailHandler = (state) => ({
    ...state,
    isLoading: false,
});

const requestHandler = (state) => ({
    ...state,
    error: false,
    isLoading: true,
});

const requestFailHandler = (state) => ({
    ...state,
    isLoading: false,
});

const flushStateHandler = () => initialState;

export const segment = handleActions(
    {
        [combineActions(fetchSegmentAction, createSegmentAction/*, updateSegmentAction*/)]: requestHandler,
        [combineActions(fetchSegmentAction.fail)]: requestFailHandler,

        [fetchSegmentAction.success]: fetchSegmentSuccessHandler,
        [fetchSegmentAction.fail]: fetchSegmentFailHandler,

        [createSegmentAction.success]: createSegmentSuccessHandler,
        [createSegmentAction.fail]: createSegmentFailHandler,
    },
    initialState,
);