import {
  GET_ANALYTICS_LIST,
  GET_ANALYTICS_LIST_ERROR,
  GET_ANALYTICS_LIST_SUCCESS,
} from './constants.analytics';

const INIT_STATE = {
  successMessage: '',
  errorMessage: '',
  loading: '',
  metadata: {},
  analyticsList: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ANALYTICS_LIST:
      return {
        ...state,
        loading: true,
        successMessage: '',
        errorMessage: '',
      };

    case GET_ANALYTICS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload?.message,
        analyticsList: action.payload?.data,
        metadata: action.payload?.metadata,
      };
    case GET_ANALYTICS_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return { ...state };
  }
};
