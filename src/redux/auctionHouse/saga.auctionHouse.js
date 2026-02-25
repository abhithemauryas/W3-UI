import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  deleteAuctionHouseError,
  deleteAuctionHouseSuccess,
  forceStopAuctionError,
  forceStopAuctionSuccess,
  getAuctionCategoryListError,
  getAuctionCategoryListSuccess,
  getAuctionHouseError,
  getAuctionHouseSuccess,
  getXpRecordsError,
  getXpRecordsSuccess,
  getXpRecordsClanWiseError,
  getXpRecordsClanWiseSuccess,
  getAuctionHouseErrorForDropdown,
  getAuctionHouseSuccessForDropdown,
} from './actions.auctionHouse';
import {
  DELETE_AUCTION_HOUSE,
  FORCE_STOP_AUCTION,
  GET_AUCTION_CATEGORY_LIST,
  GET_AUCTION_CATEGORY_PERMISSION,
  GET_AUCTION_HOUSE,
  GET_XP_RECORDS,
  GET_XP_RECORDS_CLAN_WISE,
  UPDATE_AUCTION_CATEGORY_PERMISSION,
  UPDATE_AUCTION_HOUSE_CURRENCY,
  GET_AUCTION_HOUSE_FOR_DROPDOWN,
} from './constants.auctionHouse';
import {
  deleteAuctionHouses,
  forceStopAuctionHttp,
  getAuctionCategory,
  getAuctionCategoryList,
  getAuctionHouses,
  updateAuctionCategory,
  updateAuctionCurrency,
  getXpRecords,
  getXpRecordsClanWise,
  getAuctionHouseForDropdown,
} from './httpCalls.auctionHouse';

  export function* GetAuctionHouses(action) {
    const res = yield call(getAuctionHouses, action.payload);
    if (res.success) yield put(getAuctionHouseSuccess(res));
    else yield put(getAuctionHouseError(res));
  }
  export function* GetAuctionHouseForDropdown(action) {
    const res = yield call(getAuctionHouseForDropdown, action.payload);
    if (res.success) yield put(getAuctionHouseSuccessForDropdown(res));
    else yield put(getAuctionHouseErrorForDropdown(res));
  }
export function* DeleteAuctionHouses(action) {
  const res = yield call(deleteAuctionHouses, action?.payload?.params);
  if (res.success) {
    yield put(deleteAuctionHouseSuccess(res));
  } else yield put(deleteAuctionHouseError(res));
  action?.payload?.cb?.(res);
}

export function* GetAuctionCategoryListSaga(action) {
  const res = yield call(getAuctionCategoryList);
  action?.payload?.cb?.(res);
  if (res?.success) {
    yield put(getAuctionCategoryListSuccess(res));
  } else yield put(getAuctionCategoryListError());
}

export function* GetAuctionCategoryPermissionSaga(action) {
  const { cb, params } = action.payload;
  const res = yield call(getAuctionCategory, params);
  cb?.(res);
}

export function* UpdateAuctionCategoryPermissionSaga(action) {
  const { cb, params } = action.payload;
  const res = yield call(updateAuctionCategory, params);
  cb?.(res);
}

export function* UpdateAuctionCurrencySaga(action) {
  const { cb, data, id } = action.payload;
  const res = yield call(updateAuctionCurrency, { data, id });
  cb?.(res);
}

export function* ForceStopAuctionSaga(action) {
  const { cb, data } = action.payload;
  const res = yield call(forceStopAuctionHttp, data);
  cb?.(res);
  if (res?.success) yield put(forceStopAuctionSuccess(data));
  else yield put(forceStopAuctionError());
}

export function* GetXpRecordsSaga() {
  const res = yield call(getXpRecords);
  if (res.success && res.data && Array.isArray(res.data)) {
    // Aggregate all entries into a single object
    const aggregated = res.data.reduce(
      (acc, entry) => {
        acc.joining_bonus += entry.joining_bonus || 0;
        acc.referral_bonus += entry.referral_bonus || 0;
        acc.daily_claim += entry.daily_claim || 0;
        acc.first_deposit += entry.first_deposit || 0;
        acc.first_deposit_from_referred_user +=
          entry.first_deposit_from_referred_user || 0;
        acc.bought += entry.bought || 0;
        acc.spent_on_bid += entry.spent_on_bid || 0;
        acc.product_claim += entry.product_claim || 0;
        return acc;
      },
      {
        joining_bonus: 0,
        referral_bonus: 0,
        daily_claim: 0,
        first_deposit: 0,
        first_deposit_from_referred_user: 0,
        bought: 0,
        spent_on_bid: 0,
        product_claim: 0,
      }
    );

    // Calculate total free XP (all free sources)
    const totalFreeXp =
      Number(aggregated.joining_bonus) +
      Number(aggregated.referral_bonus) +
      Number(aggregated.daily_claim) +
      Number(aggregated.first_deposit) +
      Number(aggregated.first_deposit_from_referred_user) 

    const totalXpBought = Number(aggregated.bought);
    const totalXpInMarket = Number(totalFreeXp) + Number(aggregated.bought);
    const totalXpSpent = Number(aggregated.spent_on_bid) + Number(aggregated.product_claim);
    const totalXpRemaining=totalXpInMarket-totalXpSpent

    // Calculate utilization percentage
    const xpPercentage =
      totalXpInMarket > 0
        ? `${Math.round((totalXpSpent)/ totalXpInMarket * 100)}%`
        : '0%';

    // Map to component's expected structure
    const xpData = {
      totalFreeXp,
      totalXpBought,
      totalXpInMarket,
      totalXpSpent,
      totalXpRemaining,
      xpPercentage,
    };

    yield put(getXpRecordsSuccess(xpData));
  } else {
    yield put(getXpRecordsError(res));
  }
}

export function* GetXpRecordsClanWiseSaga(action) {
  const res = yield call(getXpRecordsClanWise, action.payload);
  if (res.success) yield put(getXpRecordsClanWiseSuccess(res));
  else yield put(getXpRecordsClanWiseError(res));
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_AUCTION_HOUSE, GetAuctionHouses),
    takeEvery(GET_AUCTION_HOUSE_FOR_DROPDOWN, GetAuctionHouseForDropdown),
    takeEvery(DELETE_AUCTION_HOUSE, DeleteAuctionHouses),
    takeEvery(GET_AUCTION_CATEGORY_LIST, GetAuctionCategoryListSaga),
    takeEvery(
      GET_AUCTION_CATEGORY_PERMISSION,
      GetAuctionCategoryPermissionSaga
    ),
    takeEvery(
      UPDATE_AUCTION_CATEGORY_PERMISSION,
      UpdateAuctionCategoryPermissionSaga
    ),
    takeEvery(UPDATE_AUCTION_HOUSE_CURRENCY, UpdateAuctionCurrencySaga),
    takeEvery(FORCE_STOP_AUCTION, ForceStopAuctionSaga),
    takeEvery(GET_XP_RECORDS, GetXpRecordsSaga),
    takeEvery(GET_XP_RECORDS_CLAN_WISE, GetXpRecordsClanWiseSaga),
  ]);
}
