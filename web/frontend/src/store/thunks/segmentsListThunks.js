import {fetchSegmentsAction} from '../actions';

export const fetchSegments = (fetchParams) => async (dispatch) => dispatch(fetchSegmentsAction(fetchParams));
