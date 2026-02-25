// import { setCurrentUser } from "helpers/Utils";
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  forgetpasswordError,
  forgetpasswordSuccess,
  loginError,
  loginSuccess,
  logoutError,
  logoutSuccess,
  resetPasswordError,
  resetpasswordSuccess,
  updatePasswordError,
  updatePasswordSuccess,
  userPermissionError,
  userPermissionSuccess,
} from './actions.authentication';
import {
  FORGET_PASSWORD,
  LOGIN,
  LOGOUT,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
  USER_PERMISSION,
} from './constants.authentication';
import {
  forgetpassword,
  login,
  logout,
  resetPasswordCalls,
  updatePassword,
  userPermission,
} from './httpCalls.authentication';

export function* Login(action) {
  const { params, cb } = action.payload;
  const res = yield call(login, params);
  cb(res);
  if (res.success) {
    yield put(loginSuccess(res));
  } else yield put(loginError(res));
}

export function* Forgetpassword(action) {
  const res = yield call(forgetpassword, action.payload);
  if (res?.success) {
    yield put(forgetpasswordSuccess(res));
    action.payload.cb();
  } else yield put(forgetpasswordError(res));
}

export function* ResetPassword(action) {
  const res = yield call(resetPasswordCalls, action.payload);
  if (res.success) {
    yield put(resetpasswordSuccess(res));
  } else yield put(resetPasswordError(res));
}

export function* Logout(action) {
  const { payload: cb } = action;
  const res = yield call(logout);
  if (res?.success) {
    yield put(logoutSuccess(res));
    cb();
  } else yield put(logoutError(res));
}

export function* UserPermission() {
  const res = yield call(userPermission);
  if (res.success) yield put(userPermissionSuccess(res));
  else yield put(userPermissionError(res));
}
export function* updatePasswordSaga(action) {
  try {
    const res = yield call(updatePassword, action.payload);
    if (res.success) {
      yield put(updatePasswordSuccess(res));
      action.payload.cb();
    } else yield put(updatePasswordError(res));
  } catch (err) {
    yield put(updatePasswordError(err));
  }
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery(LOGIN, Login)],
    [yield takeEvery(FORGET_PASSWORD, Forgetpassword)],
    [yield takeEvery(LOGOUT, Logout)],
    [yield takeEvery(USER_PERMISSION, UserPermission)],
    [yield takeEvery(UPDATE_PASSWORD, updatePasswordSaga)][
      yield takeEvery(RESET_PASSWORD, ResetPassword)
    ]
  );
}
