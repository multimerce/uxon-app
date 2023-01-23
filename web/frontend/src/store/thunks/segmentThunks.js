import {fetchSegmentAction, createSegmentAction} from '../actions';

export const fetchSegment = (id) => async (dispatch) => dispatch(fetchSegmentAction(id));

export const createSegment = (data) => async (dispatch) => dispatch(createSegmentAction(data));