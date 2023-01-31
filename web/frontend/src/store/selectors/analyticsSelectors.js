import {createSelector} from 'reselect';
import get from 'lodash/get';

const baseState = (state) => get(state, 'analytics', null);

export const analytics = createSelector(baseState, (state) => get(state, 'data', {}));

export const isAnalyticsLoading = createSelector(baseState, (state) => get(state, 'isLoading', false));

export const analyticsSelector = createSelector(analytics, isAnalyticsLoading, (data, loading) => ({
    data,
    loading,
}));