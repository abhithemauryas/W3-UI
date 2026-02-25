import { all, call, put, takeEvery } from 'redux-saga/effects';
import { GET_GLOBAL_ANALYTICS } from './constants.globalAnalytics';
import { getGlobalAnalyticsHttp } from './httpCalls.globalAnalytics';
import {
  getGlobalAnalyticsError,
  getGlobalAnalyticsSuccess,
} from './actions.globalAnalytics';

export function* GetGlobalAnalytics() {
  const res = yield call(getGlobalAnalyticsHttp);
  if (res.success) yield put(getGlobalAnalyticsSuccess(res));
  else yield put(getGlobalAnalyticsError(res.message));
}

export default function* rootSaga() {
  yield all([yield takeEvery(GET_GLOBAL_ANALYTICS, GetGlobalAnalytics)]);
}
