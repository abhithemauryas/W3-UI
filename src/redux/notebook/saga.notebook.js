import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  callGetNotebook,
  callUpdateNotebook,
} from './httpCalls.notebook';
import {
  getNotebookError,
  getNotebookSuccess,
  updateNotebookError,
  updateNotebookSuccess,
} from './actions.notebook';
import {
  GET_NOTEBOOK,
  UPDATE_NOTEBOOK,
} from './constants.notebook';

export function* GetNotebookSaga(action) {
  const { cb } = action.payload;
  const res = yield call(callGetNotebook);
  if (res.success) {
    if (cb) cb(res);
    yield put(getNotebookSuccess(res));
  } else {
    yield put(getNotebookError(res));
  }
}

export function* UpdateNotebookSaga(action) {
  const res = yield call(callUpdateNotebook, action.payload);
  if (res.success) {
    yield put(updateNotebookSuccess(res));
  } else {
    yield put(updateNotebookError(res));
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(GET_NOTEBOOK, GetNotebookSaga),
    yield takeEvery(UPDATE_NOTEBOOK, UpdateNotebookSaga),
  ]);
}

