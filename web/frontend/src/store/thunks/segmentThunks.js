import {fetchSegmentAction, createSegmentAction, updateSegmentAction} from '../actions';

export const fetchSegment = (id) => async (dispatch) => dispatch(fetchSegmentAction(id));

export const createSegment = (data) => async (dispatch) => dispatch(createSegmentAction(data));

export const updateSegment = (id, data) => async (dispatch) => dispatch(updateSegmentAction(id, data))