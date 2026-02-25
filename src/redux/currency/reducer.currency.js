import {
  GET_CURRENCY,
  GET_CURRENCY_ERROR,
  GET_CURRENCY_SUCCESS,
  UPDATE_CURRENCY,
  UPDATE_CURRENCY_ERROR,
  UPDATE_CURRENCY_SUCCESS,
} from './constants.currency';

const INIT_STATE = {
  errorMessage: '',
  successMessage: '',
  loading: false,
  currencyData: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CURRENCY:
      return {
        ...state,
        errorMessage: '',
        successMessage: '',
        loading: true,
      };
    case GET_CURRENCY_SUCCESS:
      return {
        ...state,
        currencyData: action.payload,
        loading: false,
      };
    case GET_CURRENCY_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };
    case UPDATE_CURRENCY:
      return {
        ...state,
        errorMessage: '',
        successMessage: '',
        loading: true,
      };
    case UPDATE_CURRENCY_SUCCESS:
      return {
        ...state,
        successMessage: action.payload?.message,
        loading: false,
      };
    case UPDATE_CURRENCY_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};
