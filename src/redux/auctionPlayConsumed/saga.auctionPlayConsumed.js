import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  getAuctionPlayConsumedError,
  getAuctionPlayConsumedSuccess,
} from './actions.auctionPlayConsumed';
import { GET_CONSUMED_AUCTION_PLAYS } from './constants.auctionPlayConsumed';
import { getAuctionPlayConsumedHttpCall } from './httpCalls.auctionPlayConsumed';

export function* GetConsumedAuctionPlays(action) {
  const { auctionId, params } = action.payload;
  const res = yield call(getAuctionPlayConsumedHttpCall, auctionId, params);
  if (res.success) yield put(getAuctionPlayConsumedSuccess(res));
  else yield put(getAuctionPlayConsumedError(res));
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(GET_CONSUMED_AUCTION_PLAYS, GetConsumedAuctionPlays),
  ]);
}
