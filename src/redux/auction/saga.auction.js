import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  addAuctionError,
  addAuctionStartError,
  addAuctionStartSuccess,
  addAuctionSuccess,
  addAuctionTypeError,
  addAuctionTypeSuccess,
  cancelAuctionError,
  cancelAuctionSuccess,
  deleteAuctionError,
  deleteAuctionSuccess,
  getAnalyticsByAuctionError,
  getAnalyticsByAuctionHouseError,
  getAnalyticsByAuctionHouseSuccess,
  getAnalyticsByAuctionSuccess,
  getAuctionCategoryError,
  getAuctionCategorySuccess,
  getAuctionError,
  getAuctionSuccess,
  getAuctionTypeError,
  getAuctionTypeSuccess,
  getAuctionsError,
  getAuctionsSuccess,
  updateAuctionError,
  updateAuctionSuccess,
  uploadAuctionImageError,
  uploadAuctionImageSuccess,
  uploadAuctionVideoError,
  uploadAuctionVideoSuccess,deleteProductConflictError,
  deleteProductConflictSuccess,
  getProductConflictsError,
  getProductConflictsSuccess, 
  updateProductConflictError,
  updateProductConflictSuccess,
} from './actions.auction';
import {
  ADD_AUCTION,
  ADD_AUCTION_TYPE,
  CANCEL_AUCTION,
  DELETE_AUCTION,
  DELETE_AUCTION_TYPE,
  GET_ALL_AUCTION_TYPE,
  GET_AUCTION,
  GET_AUCTIONS,
  GET_AUCTION_ANALYTICS,
  GET_AUCTION_CATEGORY,
  GET_AUCTION_HOUSE_ANALYTICS,
  START_AUCTION,
  UPDATE_AUCTION,
  UPLOAD_AUCTION_IMAGE,
  UPLOAD_AUCTION_VIDEO,DELETE_PRODUCT_CONFLICT,
  GET_PRODUCT_CONFLICTS,
  UPDATE_PRODUCT_CONFLICT,
} from './constants.auction';
import {
  addAuction,
  addAuctionStart,
  addAuctionType,
  cancelAuction,
  deleteAuction,
  deleteAuctionType,
  getAnalyticsByAuctionHouseHttp,
  getAnalyticsByAuctionHttp,
  getAuction,
  getAuctionCategory,
  getAuctionType,
  getAuctions,
  updateAuction,
  uploadAuctionImage,
  uploadAuctionVideo,
  getProductConflicts,
  updateProductConflict,
  deleteProductConflict,
} from './httpCalls.auction';

export function* GetAuctions(action) {
  const { auctionId, data } = action.payload;
  const res = yield call(getAuctions, auctionId, data);
  if (res.success) {
    yield put(getAuctionsSuccess(res));
  } else {
    yield put(getAuctionsError(res));
  }
}

export function* AddAuction(action) {
  const { data, cb } = action.payload;
  const res = yield call(addAuction, data);
  if (res.success) {
    yield put(addAuctionSuccess(res));
    cb();
  } else yield put(addAuctionError(res));
}

export function* DeleteAuction(action) {
  const { auctionId, cb } = action.payload;
  const res = yield call(deleteAuction, auctionId);
  if (res.success) {
    yield put(deleteAuctionSuccess(res));
    cb();
  } else yield put(deleteAuctionError(res));
}
export function* UpdateAuction(action) {
  const { data, pathParam, cb } = action.payload;
  const res = yield call(updateAuction, pathParam, data);
  if (res.success) {
    yield put(updateAuctionSuccess(res));
    cb();
  } else yield put(updateAuctionError(res));
}
export function* GetAuction(action) {
  const { pathParam, cb } = action.payload;
  const res = yield call(getAuction, pathParam);
  if (res.success) {
    yield put(getAuctionSuccess(res?.data));
    cb?.({ ...res });
  } else yield put(getAuctionError(res));
}

export function* GetAuctionCategory() {
  const res = yield call(getAuctionCategory);
  if (res.success) yield put(getAuctionCategorySuccess(res));
  else yield put(getAuctionCategoryError(res));
}

export function* UploadAuctionImage(action) {
  const { data, cb } = action.payload;
  const res = yield call(uploadAuctionImage, data);
  cb(res);
  if (res.success) yield put(uploadAuctionImageSuccess(res));
  else yield put(uploadAuctionImageError(res));
}

export function* UploadAuctionVideo(action) {
  const { data, cb } = action.payload;
  const res = yield call(uploadAuctionVideo, data);
  cb(res);
  if (res.success) yield put(uploadAuctionVideoSuccess(res));
  else yield put(uploadAuctionVideoError(res));
}

export function* GetAuctionTypesHandling() {
  const res = yield call(getAuctionType);
  if (res?.success) yield put(getAuctionTypeSuccess(res));
  else yield put(getAuctionTypeError(res));
}

export function* AddAuctionTypes(action) {
  const { data, cb } = action.payload;
  const res = yield call(addAuctionType, data);
  cb(res);
  if (res.success) {
    yield put(addAuctionTypeSuccess(res));
  } else yield put(addAuctionTypeError(res));
}

export function* DeleteAuctionTypes(action) {
  const { data, cb } = action.payload;
  const res = yield call(deleteAuctionType, data);
  cb(res);
  if (res.success) {
    yield put(deleteAuctionSuccess(res));
  } else yield put(deleteAuctionError(res));
}
export function* AddAuctionStart(action) {
  const { data, cb } = action.payload;
  const res = yield call(addAuctionStart, data);
  if (res.success) {
    cb();
    yield put(addAuctionStartSuccess(res));
  } else yield put(addAuctionStartError(res));
}

export function* CancelAuction(action) {
  const { data, cb } = action.payload;
  const res = yield call(cancelAuction, data);
  cb(res);
  if (res.success) {
    yield put(cancelAuctionSuccess(res));
  } else yield put(cancelAuctionError(res));
}

export function* GetAnalyticsByAuctionSaga(action) {
  const { auctionId, cb } = action.payload;
  const res = yield call(getAnalyticsByAuctionHttp, auctionId);
  cb?.(res);
  if (res?.success) {
    yield put(getAnalyticsByAuctionSuccess(res?.data));
  } else yield put(getAnalyticsByAuctionError());
}

export function* GetAnalyticsByAuctionHouseSaga(action) {
  const { auctionId, cb } = action.payload;
  const res = yield call(getAnalyticsByAuctionHouseHttp, auctionId);
  cb?.(res);
  if (res?.success) {
    yield put(getAnalyticsByAuctionHouseSuccess(res?.data));
  } else yield put(getAnalyticsByAuctionHouseError());
}


export function* GetProductConflicts(action) {
  const res = yield call(getProductConflicts, action.payload);
  if (res.success) yield put(getProductConflictsSuccess(res));
  else yield put(getProductConflictsError(res));
}


export function* DeleteProductConflict(action) {
  const { pathParam, cb } = action.payload;

  const res = yield call(deleteProductConflict, pathParam);
  if (res.success) {
    yield put(deleteProductConflictSuccess(res));
  } else {
    yield put(deleteProductConflictError(res));
  }
  cb?.(res);
}
export function* UpdateProductConflict(action) {
  const { data, pathParam, cb } = action.payload;
  const res = yield call(updateProductConflict, pathParam, data);
  if (res.success) {
    yield put(updateProductConflictSuccess(res));
    cb();
  } else yield put(updateProductConflictError(res));
}


export default function* rootSaga() {
  yield all(
    [yield takeEvery(GET_AUCTIONS, GetAuctions)],
    [yield takeEvery(GET_AUCTION, GetAuction)],
    [yield takeEvery(GET_ALL_AUCTION_TYPE, GetAuctionTypesHandling)],
    [yield takeEvery(ADD_AUCTION, AddAuction)],
    [yield takeEvery(ADD_AUCTION_TYPE, AddAuctionTypes)],
    [yield takeEvery(DELETE_AUCTION, DeleteAuction)],
    [yield takeEvery(DELETE_AUCTION_TYPE, DeleteAuctionTypes)],
    [yield takeEvery(UPDATE_AUCTION, UpdateAuction)],
    [yield takeEvery(GET_AUCTION_CATEGORY, GetAuctionCategory)],
    [yield takeEvery(UPLOAD_AUCTION_IMAGE, UploadAuctionImage)],
    [yield takeEvery(UPLOAD_AUCTION_VIDEO, UploadAuctionVideo)],
    [yield takeEvery(START_AUCTION, AddAuctionStart)],
    [yield takeEvery(CANCEL_AUCTION, CancelAuction)],
    [yield takeEvery(GET_AUCTION_ANALYTICS, GetAnalyticsByAuctionSaga)],
    [
      yield takeEvery(
        GET_AUCTION_HOUSE_ANALYTICS,
        GetAnalyticsByAuctionHouseSaga
      ),
    ],[yield takeEvery(GET_PRODUCT_CONFLICTS, GetProductConflicts)],
    [yield takeEvery(DELETE_PRODUCT_CONFLICT, DeleteProductConflict)],
    [yield takeEvery(UPDATE_PRODUCT_CONFLICT, UpdateProductConflict)]
  );
}
