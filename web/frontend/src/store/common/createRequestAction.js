import { createAction } from 'redux-actions';

export const createRequestAction = (actionType, payloadCreator, metaCreator) => {
    const actionCreator = createAction(actionType, payloadCreator, metaCreator);
    actionCreator.success = `${actionType}_SUCCESS`;
    actionCreator.fail = `${actionType}_FAIL`;

    return actionCreator;
};
