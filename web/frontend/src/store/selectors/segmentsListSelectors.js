import {createSelector} from 'reselect';
import get from 'lodash/get';

const baseState = (state) => get(state, 'segments', null);

export const segments = createSelector(baseState, (state) => get(state, 'data', []));
export const isListLoading = createSelector(baseState, (state) => get(state, 'isLoading', false));
export const page = createSelector(baseState, (state) => get(state, 'page', 0));
export const total = createSelector(baseState, (state) => get(state, 'total', 0));

export const segmentsSelector = createSelector(segments, total, page, isListLoading, (data, total, page, loading) => ({
    data,
    total,
    page,
    loading,
}));
