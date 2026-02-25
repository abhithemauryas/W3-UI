import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getRevenueListError, getRevenueListSuccess } from './actions.revenue';
import { GET_REVENUE_LIST } from './constants.revenue';
import { getRevenueListHttpCall } from './httpCalls.revenue';

export function* GetRevenueList(action) {
  const { auctionId, params } = action.payload;
  const res = yield call(getRevenueListHttpCall, auctionId, params);
  if (res.success) yield put(getRevenueListSuccess(res));
  else yield put(getRevenueListError(res));
}

export default function* rootSaga() {
  yield all([yield takeEvery(GET_REVENUE_LIST, GetRevenueList)]);
}
