import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  addProductError,
  addProductSuccess,
  getCategoryError,
  getCategorySuccess,
  getProductError,
  getProductSuccess,
  uploadProductImageError,
  uploadProductImageSuccess,
  deleteProductError,
  deleteProductSuccess,
  updateProductSuccess,
  updateProductError,
  getProductsError,
  getProductsSuccess,
  deleteProductImageSuccess,
  deleteProductImageError,
  uploadProductImageGroupSuccess,
  uploadProductImageGroupError,
  getAllCategorySuccess,
  getAllCategoryError,
  updateProductStatusSuccess,
  updateProductStatusError,
} from './actions.product';
import {
  ADD_PRODUCT,
  GET_CATEGORY,
  GET_PRODUCT,
  UPLOAD_PRODUCT_IMAGE,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT_IMAGE,
  UPLOAD_PRODUCT_IMAGE_GROUP,
  GET_ALL_CATEGORY,
  ADD_CATEGORY,
  UPDATE_PRODUCT_STATUS,
} from './constants.product';
import {
  addProduct,
  getProduct,
  uploadProductImage,
  deleteProduct,
  updateProduct,
  getProducts,
  deleteProductImage,
  uploadProductImageGroup,
  callGetCategory,
  callGetAllCategory,
  callAddCategory,
  updateProductStatus,
} from './httpCalls.product';

export function* GetProducts(action) {
  const res = yield call(getProducts, action.payload);
  if (res.success) yield put(getProductsSuccess(res));
  else yield put(getProductsError(res));
}

export function* AddProduct(action) {
  const { data, cb } = action.payload;
  const res = yield call(addProduct, data);
  if (res.success) {
    yield put(addProductSuccess(res));
    cb();
  } else yield put(addProductError(res));
}

export function* GetAllCategory() {
  const res = yield call(callGetAllCategory);
  if (res.success) yield put(getAllCategorySuccess(res.data));
  else yield put(getAllCategoryError(res.message));
}

export function* GetCategory() {
  const res = yield call(callGetCategory);
  if (res.success) yield put(getCategorySuccess(res));
  else yield put(getCategoryError(res));
}
function* AddCategory(action) {
  const res = yield call(callAddCategory, action.payload.data);
  if (res.success) {
    yield put(getCategorySuccess(res.message));
    action.payload.cb(res.data);
  } else yield put(getCategoryError(res.message));
}

export function* UploadProductImage(action) {
  const { data, cb } = action.payload;
  const res = yield call(uploadProductImage, data);
  cb(res);
  if (res.success) yield put(uploadProductImageSuccess(res));
  else yield put(uploadProductImageError(res));
}
export function* UploadProductImageGroup(action) {
  const { data, cb } = action.payload;
  const res = yield call(uploadProductImageGroup, data);
  cb(res);
  if (res.success) yield put(uploadProductImageGroupSuccess(res));
  else yield put(uploadProductImageGroupError(res));
}

export function* DeleteProductImage(action) {
  const { data } = action.payload;
  const res = yield call(deleteProductImage, data);

  if (res.success) yield put(deleteProductImageSuccess(res));
  else yield put(deleteProductImageError(res));
}

export function* DeleteProduct(action) {
  const { productId, cb } = action.payload;
  const res = yield call(deleteProduct, productId);
  if (res.success) {
    yield put(deleteProductSuccess(res));
    cb();
  } else yield put(deleteProductError(res));
}
export function* UpdateProduct(action) {
  const { data, pathParam, cb } = action.payload;
  const res = yield call(updateProduct, pathParam, data);
  if (res.success) {
    yield put(updateProductSuccess(res));
    cb();
  } else yield put(updateProductError(res));
}
export function* GetProduct(action) {
  const { pathParam, cb } = action.payload;
  const res = yield call(getProduct, pathParam);
  if (res.success) {
    yield put(getProductSuccess(res));
    cb(res);
  } else yield put(getProductError(res));
}
export function* UpdateProductStatus(action) {
  const { pathParam, cb, data } = action.payload;
  const res = yield call(updateProductStatus, pathParam, data);
  if (res.success) {
    yield put(updateProductStatusSuccess(res));
    cb();
  } else yield put(updateProductStatusError(res));
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery(GET_CATEGORY, GetCategory)],
    [yield takeEvery(GET_ALL_CATEGORY, GetAllCategory)],
    [yield takeEvery(ADD_CATEGORY, AddCategory)],
    [yield takeEvery(GET_PRODUCTS, GetProducts)],
    [yield takeEvery(GET_PRODUCT, GetProduct)],
    [yield takeEvery(ADD_PRODUCT, AddProduct)],
    [yield takeEvery(UPLOAD_PRODUCT_IMAGE, UploadProductImage)],
    [yield takeEvery(UPLOAD_PRODUCT_IMAGE_GROUP, UploadProductImageGroup)],
    [yield takeEvery(DELETE_PRODUCT_IMAGE, DeleteProductImage)],
    [yield takeEvery(DELETE_PRODUCT, DeleteProduct)],
    [yield takeEvery(UPDATE_PRODUCT, UpdateProduct)][
      yield takeEvery(UPDATE_PRODUCT_STATUS, UpdateProductStatus)
    ]
  );
}
