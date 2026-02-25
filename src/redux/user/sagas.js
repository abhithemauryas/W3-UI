import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  addUserError,
  addUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  expirePlayerBallanceError,
  expirePlayerBallanceSuccess,
  getAllPlayerError,
  getAllPlayerSuccess,
  getUserError,
  getUserSuccess,
  getUsersError,
  getUsersSuccess,
  loginUserSuccess,
  updateUserError,
  updateUserSuccess,
} from './actions';
import {
  ADD_USER,
  BLOCK_PLAYER,
  DELETE_USER,
  EXPIRE_PLAYER_BALLANCE,
  GET_AIRDROP_CONFIG,
  GET_ALL_PLAYER,
  GET_SYSTEM_CONFIG,
  GET_USER,
  GET_USERS,
  LOGIN_USER1,
  PLAYS_AIRDROP,
  UPDATE_AIRDROP_CONFIG,
  UPDATE_SYSTEM_CONFIG,
  UPDATE_USER,
  UPLOAD_ONBOARD_PLAYER,
} from './constants';
import {
  addUser,
  blockPlayerHttp,
  deleteUser,
  expirePlayerBallanceHttp,
  getAirdropConfigHttp,
  getAllPlayers,
  getSystemConfigHttp,
  getUser,
  getUsers,
  loginUser,
  playsAirdrop,
  updateAirDropConfigHttp,
  updateSystemConfigHttp,
  updateUser,
  uploadOnboardPlayerHttp,
} from './httpCalls';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* LoginUser(action) {
  yield call(delay, 3000);
  const res = yield call(loginUser, action.payload);
  yield put(loginUserSuccess({ ...res }));
}

export function* GetUsers(action) {
  const { data, cb } = action.payload;
  const res = yield call(getUsers, data);
  cb?.(res);
  if (res.success) yield put(getUsersSuccess(res));
  else yield put(getUsersError(res));
}

export function* AddUser(action) {
  const { data, cb } = action.payload;
  const res = yield call(addUser, data);
  if (res.success) {
    yield put(addUserSuccess(res));
    cb();
  } else yield put(addUserError(res));
}

export function* DeleteUser(action) {
  const { userId, cb } = action.payload;
  const res = yield call(deleteUser, userId);
  if (res.success) {
    yield put(deleteUserSuccess(res));
    cb();
  } else yield put(deleteUserError(res));
}

export function* GetUser(action) {
  const { pathParam, cb } = action.payload;
  const res = yield call(getUser, pathParam);
  if (res.success) {
    yield put(getUserSuccess(res));
    cb(res);
  } else yield put(getUserError(res));
}

export function* UpdateUser(action) {
  const { data, pathParam, cb } = action.payload;
  // const { fullName, email } = data;
  const res = yield call(updateUser, pathParam, data);
  if (res.success) {
    yield put(updateUserSuccess(res));
    cb();
  } else yield put(updateUserError(res));
}

export function* PlaysAirdrop(action) {
  const { data, cb } = action.payload;
  const res = yield call(playsAirdrop, data);
  cb?.(res);
}

export function* getAllPLayerSaga(action) {
  const { params, cb } = action.payload;
  const res = yield call(getAllPlayers, params);
  cb?.(res);
  if (res?.success) {
    yield put(getAllPlayerSuccess(res));
  } else {
    yield put(getAllPlayerError());
  }
}
export function* BlockPlayerSaga(action) {
  const { userId, data, cb } = action.payload;
  const res = yield call(blockPlayerHttp, { userId, data });
  cb?.(res);
}

export function* getAirdropConfigSaga(action) {
  const { cb } = action.payload;
  const res = yield call(getAirdropConfigHttp);
  cb?.(res);
}

export function* updateAirdropConfigSaga(action) {
  const { cb, data, id } = action.payload;
  const res = yield call(updateAirDropConfigHttp, { id, data });
  cb?.(res);
}

export function* uploadOnboardPlayer(action) {
  const { cb, data } = action.payload;
  const res = yield call(uploadOnboardPlayerHttp, data);
  cb?.(res);
}

export function* expirePLayerBallance(action) {
  const { data, cb } = action.payload;
  const res = yield call(expirePlayerBallanceHttp, data);
  cb?.(res);
  if (res?.success) yield put(expirePlayerBallanceSuccess(data?.ids));
  else yield put(expirePlayerBallanceError());
}

export function* GetSystemConfigSaga(action) {
  const { cb } = action.payload;
  const res = yield call(getSystemConfigHttp);
  cb?.(res);
}

export function* UpdateSystemConfigSaga(action) {
  const { cb, id, data } = action.payload;
  const res = yield call(updateSystemConfigHttp, { id, data });
  cb?.(res);
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery(LOGIN_USER1, LoginUser)],
    [yield takeEvery(GET_USERS, GetUsers)],
    [yield takeEvery(GET_ALL_PLAYER, getAllPLayerSaga)],
    [yield takeEvery(ADD_USER, AddUser)],
    [yield takeEvery(DELETE_USER, DeleteUser)],
    [yield takeEvery(GET_USER, GetUser)],
    [yield takeEvery(UPDATE_USER, UpdateUser)],
    [yield takeEvery(PLAYS_AIRDROP, PlaysAirdrop)],
    [yield takeEvery(BLOCK_PLAYER, BlockPlayerSaga)],
    [yield takeEvery(GET_AIRDROP_CONFIG, getAirdropConfigSaga)],
    [yield takeEvery(UPDATE_AIRDROP_CONFIG, updateAirdropConfigSaga)],
    [yield takeEvery(UPLOAD_ONBOARD_PLAYER, uploadOnboardPlayer)],
    [yield takeEvery(EXPIRE_PLAYER_BALLANCE, expirePLayerBallance)],
    [yield takeEvery(GET_SYSTEM_CONFIG, GetSystemConfigSaga)],
    [yield takeEvery(UPDATE_SYSTEM_CONFIG, UpdateSystemConfigSaga)]
  );
}
