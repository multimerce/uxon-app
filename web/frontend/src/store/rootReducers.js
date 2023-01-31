import {combineReducers} from 'redux';
import {
    segment,
    segments,
    analytics,
} from './reducers';

const rootReducer = combineReducers({segment, segments, analytics});

export default rootReducer;