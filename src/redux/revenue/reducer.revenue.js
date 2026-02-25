import {
  GET_REVENUE_LIST,
  GET_REVENUE_LIST_ERROR,
  GET_REVENUE_LIST_SUCCESS,
} from './constants.revenue';

const INIT_STATE = {
  revenueList: [],
  loading: false,
  errorMessage: '',
  successMessage: '',
  metadata: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REVENUE_LIST:
      return {
        ...state,
        loading: true,
        revenueList: [],
        successMessage: '',
        errorMessage: '',
      };
    case GET_REVENUE_LIST_SUCCESS:
      return {
        ...state,
        revenueList: [...action.payload.data],
        metadata: action.payload.metadata,
        loading: false,
        errorMessage: '',
      };
    case GET_REVENUE_LIST_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload?.message,
        loading: false,
      };

    default:
      return { ...state };
  }
};
