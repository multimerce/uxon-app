import {createAction} from 'redux-actions';
import {createRequestAction} from '../common';

const PREFIX = 'SINGLE_SEGMENT';

export const fetchSegmentAction = createRequestAction(`${PREFIX}/FETCH`, (id) => ({
    request: {
        url: `api/v1/segments/${id}`,
    },
}));

export const createSegmentAction = createRequestAction(`${PREFIX}/CREATE`, (data) => ({
    request: {
        method: 'POST',
        url: `/api/v1/segments`,
        data: {
            segmentData: data,
            // segment: data
            //     ? { ...data }
            //     : {
            //         name: 'New segment',
            //     },
        },
    },
}));
