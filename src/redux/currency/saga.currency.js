import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getCurrencyHttp, updateCurrencyHttp } from './httpCalls.currency';
import {
  getCurrencyError,
  getCurrencySuccess,
  updateCurrencyError,
  updateCurrencySuccess,
} from './action.currency';
import { GET_CURRENCY, UPDATE_CURRENCY } from './constants.currency';

export function* GetCurrencySaga(action) {
  const { currencyCode, cb } = action.payload;
  const res = yield call(getCurrencyHttp, currencyCode);
  if (res.success) {
    yield put(getCurrencySuccess(res?.data));
    cb(res);
  } else yield put(getCurrencyError(res?.message));
}

export function* UpdateCurrencySaga(action) {
  const { data, id } = action.payload;
  const res = yield call(updateCurrencyHttp, data, id);
  if (res.success) yield put(updateCurrencySuccess(res?.data, res?.message));
  else yield put(updateCurrencyError(res?.message));
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery(GET_CURRENCY, GetCurrencySaga)],
    [yield takeEvery(UPDATE_CURRENCY, UpdateCurrencySaga)]
  );
}
