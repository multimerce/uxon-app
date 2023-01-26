import {combineActions, handleActions} from 'redux-actions';
import get from 'lodash/get';
import {fetchSegmentsAction, deleteSegmentAction, changeSegmentStatusAction, updateSegmentAction, duplicateSegmentAction} from "../actions";

const initialState = {
    data: [],
    isLoading: false,
    page: 0,
    total: 0,
};

const fetchSegmentsSuccessHandler = (state, {payload}) => {
    const data = get(payload, 'data.data', {});

    return {
        ...state,
        ...data,
        isLoading: false,
    };
};

const deleteSegmentSuccessHandler = (state, {meta}) => {
    const data = state.data.filter((item) => item._id !== get(meta, 'previousAction.meta.id', null));

    return {
        ...state,
        data,
        isLoading: false,
    }
};

const changeSegmentStatusSuccessHandler = (state, {payload}) => {
    const editedSegment = get(payload, 'data.data', {});
    const data = state.data.map((item) => item._id === editedSegment._id ? {
            ...item,
            status: editedSegment.status
        } : item
    );

    return {
        ...state,
        data,
        isLoading: false,
    };
};

const updateSegmentSuccessHandler = (state, { payload }) => {
    const editedSegment = get(payload, 'data.data', {});
    const data = state.data.map((item) => item._id === editedSegment._id ? editedSegment : item);

    return {
        ...state,
        data,
        isLoading: false,
    };
};

const duplicateSegmentSuccessHandler = (state, { payload }) => {
    const newSegment = get(payload, 'data.data', {});
    const data = state.data.concat(newSegment);

    return {
        ...state,
        data,
        isLoading: false,
    };
};

// const fetchSegmentsFailHandler = (state) => ({
//     ...state,
//     isLoading: false,
// });
//
// const deleteSegmentFailHandler = (state) => ({
//     ...state,
//     isLoading: false,
// });
//
// const changeSegmentStatusFailHandler = (state) => ({
//     ...state,
//     isLoading: false,
// });
//
// const updateSegmentFailHandler = (state) => ({
//     ...state,
//     isLoading: false,
// });
//
// const updateSegmentFailHandler = (state) => ({
//     ...state,
//     isLoading: false,
// });

const requestHandler = (state) => ({
    ...state,
    error: false,
    isLoading: true,
});

const requestFailHandler = (state) => ({
    ...state,
    isLoading: false,
});

export const segments = handleActions(
    {
        [combineActions(fetchSegmentsAction, deleteSegmentAction, changeSegmentStatusAction, updateSegmentAction, duplicateSegmentAction)]: requestHandler,
        [combineActions(fetchSegmentsAction.fail)]: requestFailHandler,

        [fetchSegmentsAction.success]: fetchSegmentsSuccessHandler,
        [fetchSegmentsAction.fail]: requestFailHandler,

        [deleteSegmentAction.success]: deleteSegmentSuccessHandler,
        [deleteSegmentAction.fail]: requestFailHandler,

        [changeSegmentStatusAction.success]: changeSegmentStatusSuccessHandler,
        [changeSegmentStatusAction.fail]: requestFailHandler,

        [updateSegmentAction.success]: updateSegmentSuccessHandler,
        [updateSegmentAction.fail]: requestFailHandler,

        [duplicateSegmentAction.success]: duplicateSegmentSuccessHandler,
        [duplicateSegmentAction.fail]: requestFailHandler,
    },
    initialState,
);