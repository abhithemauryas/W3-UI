import {
  GET_GLOBAL_ANALYTICS,
  GET_GLOBAL_ANALYTICS_ERROR,
  GET_GLOBAL_ANALYTICS_SUCCESS,
} from './constants.globalAnalytics';

export const getGlobalAnalytics = () => {
  return { type: GET_GLOBAL_ANALYTICS };
};

export const getGlobalAnalyticsSuccess = (data) => {
  return {
    type: GET_GLOBAL_ANALYTICS_SUCCESS,
    payload: data,
  };
};
export const getGlobalAnalyticsError = (message) => {
  return {
    type: GET_GLOBAL_ANALYTICS_ERROR,
    payload: message,
  };
};
