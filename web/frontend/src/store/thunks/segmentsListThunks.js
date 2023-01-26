import {fetchSegmentsAction, deleteSegmentAction, changeSegmentStatusAction, duplicateSegmentAction} from '../actions';

export const fetchSegments = (fetchParams) => async (dispatch) => dispatch(fetchSegmentsAction(fetchParams));

export const deleteSegment = (id) => async (dispatch) => dispatch(deleteSegmentAction(id));

export const changeSegmentStatus = (id, newStatus) => async (dispatch) => dispatch(changeSegmentStatusAction(id, newStatus));

export const duplicateSegment = (id) => async (dispatch) => dispatch(duplicateSegmentAction(id));