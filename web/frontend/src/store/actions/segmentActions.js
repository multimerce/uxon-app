import {createAction} from 'redux-actions';
import {createRequestAction} from '../common';

const PREFIX = 'SINGLE_SEGMENT';

export const createSegmentAction = createRequestAction(`${PREFIX}/CREATE`, (data) => ({
    request: {
        method: 'POST',
        url: `/segments`,
        data: {
            segmentData: data,
        },
    },
}));

export const fetchSegmentAction = createRequestAction(`${PREFIX}/FETCH`, (id) => ({
    request: {
        url: `/segments/${id}`,
    },
}));

export const updateSegmentAction = createRequestAction(`${PREFIX}/UPDATE`, (id, data) => ({
    request: {
        method: 'PATCH',
        url: `/segments/${id}`,
        data: {
            segmentData: data,
        },
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
    (id) => ({id}),
);

export const duplicateSegmentAction = createRequestAction(
    `${PREFIX}/DUPLICATE`,
    (id) => ({
        request: {
            method: 'POST',
            url: `/segments/${id}`,
        },
    }),
    (id) => ({id}),
);

export const changeSegmentStatusAction = createRequestAction(`${PREFIX}/STATUS`, (id, newStatus) => ({
    request: {
        method: 'PATCH',
        url: `/segments/${id}`,
        data: {
            segmentData: {
                status: newStatus,
            }
        },
    },
}));

