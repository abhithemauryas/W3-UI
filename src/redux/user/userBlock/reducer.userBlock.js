import {
  BLOCK_USER,
  BLOCK_USER_ERROR,
  BLOCK_USER_SUCCESS,
} from './constants.userBlock';

const INIT_STATE = {
  successMessage: '',
  loading: false,
  errorMessage: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case BLOCK_USER:
      return {
        ...state,
        successMessage: '',
        errorMessage: '',
      };
    case BLOCK_USER_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
      };
    case BLOCK_USER_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return { ...state };
  }
};
