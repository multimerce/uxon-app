import {combineActions, handleActions} from 'redux-actions';
import get from 'lodash/get';
import {fetchSegmentsAction} from "../actions";

const initialState = {
    data: [],
    isLoading: false,
    page: 0,
    total: 0,
};

const fetchSegmentsSuccessHandler = (state, { payload }) => {
    const data = get(payload, 'data.data', {});
    return {
        ...state,
        ...data,
        isLoading: false,
    };
};

const fetchSegmentsFailHandler = (state) => ({
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

export const segments = handleActions(
    {
        [combineActions(fetchSegmentsAction)]: requestHandler,
        [combineActions(fetchSegmentsAction.fail)]: requestFailHandler,
        [fetchSegmentsAction.success]: fetchSegmentsSuccessHandler,
        [fetchSegmentsAction.fail]: fetchSegmentsFailHandler,
    },
    initialState,
);