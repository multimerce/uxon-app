import {fetchAnalyticsAction} from '../actions';

export const fetchAnalytics = (params) => async (dispatch) => dispatch(fetchAnalyticsAction(params));