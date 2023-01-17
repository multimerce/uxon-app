import { createSelector } from 'reselect';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

const baseState = (state) => get(state, 'segment', null);

export const segmentSelector = createSelector(baseState, (state) => {
    const data = get(state, 'data', {});
    return data;
});

export const isLoading = createSelector(baseState, (state) => get(state, 'isLoading', false));

export const hasDataChanges = createSelector(
    baseState,
    segmentSelector,
    (state, current) => !isEqual(get(state, 'originSegmentData', false), current),
);