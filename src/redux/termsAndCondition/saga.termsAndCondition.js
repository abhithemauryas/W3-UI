import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  callCreateTermsAndCondition,
  callGetTermsAndCondition,
  callUpdateTermsAndCondition,
} from './httpCalls.termsAndCondition';
import {
  createTermsAndConditionError,
  createTermsAndConditionSuccess,
  getTermsAndConditionError,
  getTermsAndConditionSuccess,
  updateTermsAndConditionError,
  updateTermsAndConditionSuccess,
} from './actions.termsAndCondition';
import {
  CREATE_TERMS_AND_CONDITION,
  GET_TERMS_AND_CONDITION,
  UPDATE_TERMS_AND_CONDITION,
} from './constant.termsAndCondition';

export function* CreateTermsAndConditionSaga(action) {
  const res = yield call(callCreateTermsAndCondition, action.payload);
  if (res.success) yield put(createTermsAndConditionSuccess(res));
  else yield put(createTermsAndConditionError(res));
}
export function* GetTermsAndConditionSaga(action) {
  const { cb } = action.payload;
  const res = yield call(callGetTermsAndCondition);
  if (res.success) {
    cb(res);
    yield put(getTermsAndConditionSuccess(res));
  } else yield put(getTermsAndConditionError(res));
}
export function* UpdateTermsAndConditionSaga(action) {
  const res = yield call(callUpdateTermsAndCondition, action.payload);
  if (res.success) yield put(updateTermsAndConditionSuccess(res));
  else yield put(updateTermsAndConditionError(res));
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery(CREATE_TERMS_AND_CONDITION, CreateTermsAndConditionSaga)],
    [yield takeEvery(GET_TERMS_AND_CONDITION, GetTermsAndConditionSaga)],
    [yield takeEvery(UPDATE_TERMS_AND_CONDITION, UpdateTermsAndConditionSaga)]
  );
}
