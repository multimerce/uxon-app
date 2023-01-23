import {combineReducers} from 'redux';
import {
    segment,
    segments,
} from './reducers';

const rootReducer = combineReducers({segment, segments});

export default rootReducer;