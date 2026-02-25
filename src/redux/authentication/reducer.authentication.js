import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_ERROR,
  UPDATE_PASSWORD_SUCCESS,
  USER_PERMISSION,
  USER_PERMISSION_ERROR,
  USER_PERMISSION_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
} from './constants.authentication';

const INIT_STATE = {
  loading: false,
  errorMessage: '',
  successMesage: '',
  permission: [],
  userInfo: {},
  metadata: {},
  resetPasswordStatus: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
        userInfo: '',
        permission: [],
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload?.data,
        errorMessage: '',
        successMesage: action.payload?.message,
        permission: action.payload.data.permission,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload?.message,
        successMesage: '',
      };
    case LOGOUT:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
        successMesage: action.payload?.message,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload?.message,
        successMesage: '',
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
        successMesage: action.payload?.message,
      };
    case FORGET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload?.message,
        successMesage: '',
      };
    case USER_PERMISSION:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case USER_PERMISSION_SUCCESS:
      return {
        ...state,
        permission: action.payload.data,
        loading: false,
        errorMessage: '',
      };
    case USER_PERMISSION_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        loading: false,
        successMesage: '',
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        successMesage: action.payload?.message,
      };
    case UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload?.message,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        resetPasswordStatus: '',
        successMesage: '',
        errorMessage: '',
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordStatus: action.payload,
        successMesage: action.payload?.message,

        loading: false,
        errorMessage: '',
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswordStatus: action.payload,
        errorMessage: action.payload?.message,
        loading: false,
        successMesage: '',
      };
    default:
      return { ...state };
  }
};
