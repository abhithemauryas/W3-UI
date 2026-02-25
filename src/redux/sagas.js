import { all } from 'redux-saga/effects';
import AnalyticsSaga from './analytics/saga.analytics';
import auctionSaga from './auction/saga.auction';
import auctionHousesSaga from './auctionHouse/saga.auctionHouse';
import auctionPlayConsumedSaga from './auctionPlayConsumed/saga.auctionPlayConsumed';
import authSagas from './auth/saga';
import authenticationSaga from './authentication/saga.authentication';
import chatSagas from './chat/saga';
import CurrencySaga from './currency/saga.currency';
import GlobalAnalyticsSaga from './globalAnalytics/saga.globalAnalytics';
import productSaga from './product/saga.product';
import ReferralSaga from './referral/saga.referral';
import revenueSaga from './revenue/saga.revenue';
import surveyDetailSagas from './surveyDetail/saga';
import surveyListSagas from './surveyList/saga';
import termsAndConditionSaga from './termsAndCondition/saga.termsAndCondition';
import todoSagas from './todo/saga';
import userSaga from './user/sagas';
import UserBlockSaga from './user/userBlock/sagas.userBlock';
import notebookSaga from './notebook/saga.notebook';

export default function* rootSaga() {
  yield all([
    authSagas(),
    todoSagas(),
    chatSagas(),
    surveyListSagas(),
    surveyDetailSagas(),
    userSaga(),
    auctionHousesSaga(),
    productSaga(),
    authenticationSaga(),
    auctionSaga(),
    termsAndConditionSaga(),
    ReferralSaga(),
    AnalyticsSaga(),
    GlobalAnalyticsSaga(),
    CurrencySaga(),
    UserBlockSaga(),
    auctionPlayConsumedSaga(),
    revenueSaga(),
    notebookSaga(),
  ]);
}
