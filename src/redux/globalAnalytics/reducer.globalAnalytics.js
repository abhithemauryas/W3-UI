import {
  GET_GLOBAL_ANALYTICS,
  GET_GLOBAL_ANALYTICS_ERROR,
  GET_GLOBAL_ANALYTICS_SUCCESS,
} from './constants.globalAnalytics';

const INIT_STATE = {
  successMessage: '',
  errorMessage: '',
  loading: false,
  globalAnalyticsData: {},
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GLOBAL_ANALYTICS:
      return {
        ...state,
        loading: true,
        successMessage: '',
        errorMessage: '',
      };
    case GET_GLOBAL_ANALYTICS_SUCCESS:
      return {
        ...state,
        successMessage: action.payload?.message,
        globalAnalyticsData: action.payload?.data[0],
        loading: false,
      };
    case GET_GLOBAL_ANALYTICS_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};
