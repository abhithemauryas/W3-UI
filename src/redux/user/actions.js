import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  BLOCK_PLAYER,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  EXPIRE_PLAYER_BALLANCE,
  EXPIRE_PLAYER_BALLANCE_ERROR,
  EXPIRE_PLAYER_BALLANCE_SUCCESS,
  GET_AIRDROP_CONFIG,
  GET_ALL_PLAYER,
  GET_ALL_PLAYER_ERROR,
  GET_ALL_PLAYER_SUCCESS,
  GET_SYSTEM_CONFIG,
  GET_USER,
  GET_USERS,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  LOGIN_USER1,
  LOGIN_USER_ERROR1,
  LOGIN_USER_SUCCESS1,
  PLAYS_AIRDROP,
  UPDATE_AIRDROP_CONFIG,
  UPDATE_SYSTEM_CONFIG,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPLOAD_ONBOARD_PLAYER,
} from './constants';

export const loginUser = (user) => ({
  type: LOGIN_USER1,
  payload: user,
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS1,
  payload: user,
});
export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR1,
  payload: { message },
});

export const getUsers = (data, cb = () => {}) => {
  return {
    type: GET_USERS,
    payload: { data, cb },
  };
};
export const getUsersSuccess = (data) => ({
  type: GET_USERS_SUCCESS,
  payload: data,
});
export const getUsersError = (message) => ({
  type: GET_USERS_ERROR,
  payload: message,
});

export const addUser = (data, cb) => {
  return {
    type: ADD_USER,
    payload: { data, cb },
  };
};
export const addUserSuccess = (data) => ({
  type: ADD_USER_SUCCESS,
  payload: data,
});
export const addUserError = (message) => ({
  type: ADD_USER_ERROR,
  payload: message,
});
export const deleteUser = (userId, cb) => {
  return {
    type: DELETE_USER,
    payload: { userId, cb },
  };
};
export const deleteUserSuccess = (data) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: { data },
  };
};
export const deleteUserError = (data) => {
  return {
    type: DELETE_USER_ERROR,
    payload: { data },
  };
};
export const getUser = (pathParam, cb) => {
  return {
    type: GET_USER,
    payload: { pathParam, cb },
  };
};
export const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data,
});
export const getUserError = (message) => ({
  type: GET_USER_ERROR,
  payload: message,
});
export const updateUser = (pathParam, data, cb) => {
  return {
    type: UPDATE_USER,
    payload: { pathParam, data, cb },
  };
};
export const updateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  payload: data.message,
});
export const updateUserError = (message) => ({
  type: UPDATE_USER_ERROR,
  payload: message,
});

export const playAirdrop = (data) => ({
  type: PLAYS_AIRDROP,
  payload: data,
});

export const getAllPlayers = (payload) => ({
  type: GET_ALL_PLAYER,
  payload,
});

export const getAllPlayerSuccess = (data) => ({
  type: GET_ALL_PLAYER_SUCCESS,
  payload: data,
});

export const getAllPlayerError = () => ({
  type: GET_ALL_PLAYER_ERROR,
});

export const blockPlayer = (payload) => ({
  type: BLOCK_PLAYER,
  payload,
});

export const getAirdropConfig = (payload) => ({
  type: GET_AIRDROP_CONFIG,
  payload,
});

export const updateAirDropConfig = (payload) => ({
  type: UPDATE_AIRDROP_CONFIG,
  payload,
});

export const uploadOnboardPlayer = (payload) => ({
  type: UPLOAD_ONBOARD_PLAYER,
  payload,
});

export const expirePlayerBallance = (payload) => ({
  type: EXPIRE_PLAYER_BALLANCE,
  payload,
});

export const expirePlayerBallanceSuccess = (payload) => ({
  type: EXPIRE_PLAYER_BALLANCE_SUCCESS,
  payload,
});
export const expirePlayerBallanceError = (payload) => ({
  type: EXPIRE_PLAYER_BALLANCE_ERROR,
  payload,
});

export const getSystemConfig = (payload) => ({
  type: GET_SYSTEM_CONFIG,
  payload,
});

export const updateSystemConfig = (payload) => ({
  type: UPDATE_SYSTEM_CONFIG,
  payload,
});
