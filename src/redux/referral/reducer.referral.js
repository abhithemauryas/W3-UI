import {
  GET_REFERRAL_AMOUNT,
  GET_REFERRAL_ERROR,
  GET_REFERRAL_SUCCESS,
  PATCH_REFERRAL_VALUE,
  PATCH_REFERRAL_VALUE_ERROR,
  PATCH_REFERRAL_VALUE_SUCCESS,
} from './constants.referral';

const INIT_STATE = {
  referralCode: {},
  loading: false,
  errorMessage: '',
  successMessage: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REFERRAL_AMOUNT:
      return {
        ...state,
        loading: true,
        successMessage: '',
        errorMessage: '',
      };
    case GET_REFERRAL_SUCCESS:
      return {
        ...state,
        referralCode: action.payload.data,
        loading: false,
        errorMessage: '',
      };
    case GET_REFERRAL_ERROR:
      return {
        ...state,
        successMessage: '',
        errorMessage: action.payload?.message,
        loading: false,
      };
    case PATCH_REFERRAL_VALUE: {
      return {
        ...state,
        loading: true,
        successMessage: '',
        errorMessage: '',
      };
    }
    case PATCH_REFERRAL_VALUE_SUCCESS: {
      return {
        ...state,
        successMessage: action.payload?.message,
        loading: false,
      };
    }
    case PATCH_REFERRAL_VALUE_ERROR: {
      return {
        ...state,
        errorMessage: action.payload?.message,
        loading: false,
      };
    }
    default:
      return { ...state };
  }
};
