import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getAnalyticsListHttp } from './httpCalls.analytics';
import {
  getAnalyticsListError,
  getAnalyticsListSuccess,
} from './actions.analytics';
import { GET_ANALYTICS_LIST } from './constants.analytics';

export function* GetAnalyticsList(action) {
  const res = yield call(getAnalyticsListHttp, action.payload);
  if (res.success) yield put(getAnalyticsListSuccess(res));
  else yield put(getAnalyticsListError(res.message));
}

export default function* rootSaga() {
  yield all([yield takeEvery(GET_ANALYTICS_LIST, GetAnalyticsList)]);
}
