import {createAction} from 'redux-actions';
import {createRequestAction} from '../common';

const PREFIX = 'SEGMENTS';

export const fetchSegmentsAction = createRequestAction(`${PREFIX}/FETCH`, () => ({
    request: {
        url: `/segments`,
    },
}));

export const deleteSegmentAction = createRequestAction(
    `${PREFIX}/DELETE`,
    (id) => ({
        request: {
            method: 'DELETE',
            url: `/segments/${id}`,
        },
    }),
    (id) => ({ id }),
);

export const duplicateSegmentAction = createRequestAction(
    `${PREFIX}/DUPLICATE`,
    (id) => ({
        request: {
            method: 'POST',
            url: `/segments/${id}`,
        },
    }),
    (id) => ({ id }),
);

export const changeSegmentStatusAction = createRequestAction(`${PREFIX}/STATUS`, (segment, newStatus) => ({
    request: {
        method: 'PATCH',
        url: `/api/v1/segments/${segment.id}`,
        data: {
            status: newStatus,
        },
    },
}));
