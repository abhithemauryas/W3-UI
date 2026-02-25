import { all, call, put, takeEvery } from 'redux-saga/effects';
import { BLOCK_USER } from './constants.userBlock';
import { blockUserError, blockUserSuccess } from './actions.userBlock';
import { blockUser } from './httpCalls.userBlock';

export function* BlockUser(action) {
  const { userId, data, cb } = action.payload;
  const res = yield call(blockUser, { userId, data });
  if (res.success) {
    cb(res);
    yield put(blockUserSuccess(res?.message));
  } else yield put(blockUserError(res?.message));
}

export default function* rootSaga() {
  yield all([yield takeEvery(BLOCK_USER, BlockUser)]);
}
