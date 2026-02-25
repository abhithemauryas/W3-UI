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
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_ERROR,
  UPDATE_PASSWORD_SUCCESS,
  USER_PERMISSION,
  USER_PERMISSION_ERROR,
  USER_PERMISSION_SUCCESS,
} from './constants.authentication';

export const login = (params, cb) => {
  return {
    type: LOGIN,
    payload: { params, cb },
  };
};
export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});
export const loginError = (data) => {
  return {
    type: LOGIN_ERROR,
    payload: data,
  };
};

export const resetPassword = (params) => {
  return {
    type: RESET_PASSWORD,
    payload: params,
  };
};
export const resetpasswordSuccess = (data) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data,
});
export const resetPasswordError = (data) => {
  return {
    type: RESET_PASSWORD_ERROR,
    payload: data,
  };
};

export const logout = (obj) => {
  const { cb } = obj;
  return {
    type: LOGOUT,
    payload: cb,
  };
};
export const logoutSuccess = (data) => ({
  type: LOGOUT_SUCCESS,
  payload: data,
});
export const logoutError = (message) => {
  return {
    type: LOGOUT_ERROR,
    payload: message,
  };
};

export const forgetpassword = (params) => {
  return {
    type: FORGET_PASSWORD,
    payload: params,
  };
};
export const forgetpasswordSuccess = (response) => ({
  type: FORGET_PASSWORD_SUCCESS,
  payload: response,
});
export const forgetpasswordError = (response) => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: response,
  };
};
export const updatePassword = (params) => {
  return {
    type: UPDATE_PASSWORD,
    payload: params,
  };
};
export const updatePasswordSuccess = (message) => ({
  type: UPDATE_PASSWORD_SUCCESS,
  payload: message,
});
export const updatePasswordError = (response) => {
  return {
    type: UPDATE_PASSWORD_ERROR,
    payload: response,
  };
};
export const userPermission = () => {
  return {
    type: USER_PERMISSION,
  };
};
export const userPermissionSuccess = (data) => ({
  type: USER_PERMISSION_SUCCESS,
  payload: data,
});
export const userPermissionError = (message) => {
  return {
    type: USER_PERMISSION_ERROR,
    payload: message,
  };
};
