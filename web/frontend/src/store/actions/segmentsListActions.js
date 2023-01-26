import {createAction} from 'redux-actions';
import {createRequestAction} from '../common';

const PREFIX = 'SEGMENTS';

export const fetchSegmentsAction = createRequestAction(`${PREFIX}/FETCH`, () => ({
    request: {
        url: `/segments`,
    },
}));
