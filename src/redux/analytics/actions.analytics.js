import {
  GET_ANALYTICS_LIST,
  GET_ANALYTICS_LIST_ERROR,
  GET_ANALYTICS_LIST_SUCCESS,
} from './constants.analytics';

export const getAnalyticsList = (data) => {
  return {
    type: GET_ANALYTICS_LIST,
    payload: data,
  };
};

export const getAnalyticsListSuccess = (data) => {
  return {
    type: GET_ANALYTICS_LIST_SUCCESS,
    payload: data,
  };
};
export const getAnalyticsListError = (message) => {
  return {
    type: GET_ANALYTICS_LIST_ERROR,
    payload: message,
  };
};
