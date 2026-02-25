import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_REFERRAL_AMOUNT,
  PATCH_REFERRAL_VALUE,
} from './constants.referral';
import { getReferral, patchReferralHttp } from './httpCalls.referral';
import {
  getReferralError,
  getReferralSuccess,
  patchReferralError,
  patchReferralSuccess,
} from './actions.referral';

export function* GetReferralAmount(action) {
  const { cb } = action.payload;
  const res = yield call(getReferral);
  if (res.success) {
    cb(res);
    yield put(getReferralSuccess(res));
  } else yield put(getReferralError(res));
}
export function* PatchReferralValue(action) {
  const res = yield call(patchReferralHttp, action.payload);
  if (res.success) yield put(patchReferralSuccess(res));
  else yield put(patchReferralError(res));
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(GET_REFERRAL_AMOUNT, GetReferralAmount),
    yield takeEvery(PATCH_REFERRAL_VALUE, PatchReferralValue),
  ]);
}
