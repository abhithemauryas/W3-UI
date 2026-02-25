import {
  BLOCK_USER,
  BLOCK_USER_ERROR,
  BLOCK_USER_SUCCESS,
} from './constants.userBlock';

export const blockUser = (params) => {
  return {
    type: BLOCK_USER,
    payload: params,
  };
};

export const blockUserSuccess = (message) => {
  return {
    type: BLOCK_USER_SUCCESS,
    payload: message,
  };
};
export const blockUserError = (message) => {
  return {
    type: BLOCK_USER_ERROR,
    payload: message,
  };
};
