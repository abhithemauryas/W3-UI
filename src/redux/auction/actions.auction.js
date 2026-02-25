import {
  ADD_AUCTION,
  ADD_AUCTION_ERROR,
  ADD_AUCTION_SUCCESS,
  ADD_AUCTION_TYPE,
  CANCEL_AUCTION,
  CANCEL_AUCTION_ERROR,
  CANCEL_AUCTION_SUCCESS,
  DELETE_AUCTION,
  DELETE_AUCTION_ERROR,
  DELETE_AUCTION_SUCCESS,
  DELETE_AUCTION_TYPE,
  GET_ALL_AUCTION_TYPE,
  GET_ALL_AUCTION_TYPE_ERROR,
  GET_ALL_AUCTION_TYPE_SUCCESS,
  GET_AUCTION,
  GET_AUCTIONS,
  GET_AUCTIONS_ERROR,
  GET_AUCTIONS_SUCCESS,
  GET_AUCTION_ANALYTICS,
  GET_AUCTION_ANALYTICS_ERROR,
  GET_AUCTION_ANALYTICS_SUCCESS,
  GET_AUCTION_CATEGORY,
  GET_AUCTION_CATEGORY_ERROR,
  GET_AUCTION_CATEGORY_SUCCESS,
  GET_AUCTION_ERROR,
  GET_AUCTION_HOUSE_ANALYTICS,
  GET_AUCTION_HOUSE_ANALYTICS_ERROR,
  GET_AUCTION_HOUSE_ANALYTICS_SUCCESS,
  GET_AUCTION_SUCCESS,
  START_AUCTION,
  START_AUCTION_ERROR,
  START_AUCTION_SUCCESS,
  UPDATE_AUCTION,
  UPDATE_AUCTION_ERROR,
  UPDATE_AUCTION_SUCCESS,
  UPLOAD_AUCTION_IMAGE,
  UPLOAD_AUCTION_IMAGE_ERROR,
  UPLOAD_AUCTION_IMAGE_SUCCESS,
  UPLOAD_AUCTION_VIDEO,
  UPLOAD_AUCTION_VIDEO_ERROR,
  UPLOAD_AUCTION_VIDEO_SUCCESS,
  DELETE_PRODUCT_CONFLICT,
  DELETE_PRODUCT_CONFLICT_ERROR,
  DELETE_PRODUCT_CONFLICT_SUCCESS,
  GET_PRODUCT_CONFLICTS,
  GET_PRODUCT_CONFLICTS_ERROR,
  GET_PRODUCT_CONFLICTS_SUCCESS,
  UPDATE_PRODUCT_CONFLICT_SUCCESS,
  UPDATE_PRODUCT_CONFLICT_ERROR,
  UPDATE_PRODUCT_CONFLICT,
} from './constants.auction';

export const getAuctions = (auctionId, data) => {
  return {
    type: GET_AUCTIONS,
    payload: { auctionId, data },
  };
};
export const getAuctionsSuccess = (data) => {
  return {
    type: GET_AUCTIONS_SUCCESS,
    payload: data,
  };
};
export const getAuctionsError = (message) => {
  return {
    type: GET_AUCTIONS_ERROR,
    payload: message,
  };
};

export const addAuction = (data, cb) => {
  return {
    type: ADD_AUCTION,
    payload: { data, cb },
  };
};
export const addAuctionSuccess = (data) => ({
  type: ADD_AUCTION_SUCCESS,
  payload: data,
});
export const addAuctionError = (message) => ({
  type: ADD_AUCTION_ERROR,
  payload: message,
});

export const deleteAuction = (auctionId, cb) => {
  return {
    type: DELETE_AUCTION,
    payload: { auctionId, cb },
  };
};
export const deleteAuctionSuccess = (data) => {
  return {
    type: DELETE_AUCTION_SUCCESS,
    payload: data,
  };
};
export const deleteAuctionError = (data) => {
  return {
    type: DELETE_AUCTION_ERROR,
    payload: data.message,
  };
};

export const updateAuction = (pathParam, data, cb) => {
  return {
    type: UPDATE_AUCTION,
    payload: { pathParam, data, cb },
  };
};
export const updateAuctionSuccess = (data) => ({
  type: UPDATE_AUCTION_SUCCESS,
  payload: data,
});
export const updateAuctionError = (message) => ({
  type: UPDATE_AUCTION_ERROR,
  payload: message,
});

export const getAuction = (pathParam, cb) => {
  return {
    type: GET_AUCTION,
    payload: { pathParam, cb },
  };
};
export const getAuctionSuccess = (data) => ({
  type: GET_AUCTION_SUCCESS,
  payload: data,
});
export const getAuctionError = (message) => ({
  type: GET_AUCTION_ERROR,
  payload: message,
});

// TODO Check this and Remove this

export const getAuctionCategory = () => {
  return {
    type: GET_AUCTION_CATEGORY,
  };
};
export const getAuctionCategorySuccess = (data) => ({
  type: GET_AUCTION_CATEGORY_SUCCESS,
  payload: data,
});
export const getAuctionCategoryError = (message) => ({
  type: GET_AUCTION_CATEGORY_ERROR,
  payload: message,
});

export const uploadAuctionImage = (data, cb) => {
  return {
    type: UPLOAD_AUCTION_IMAGE,
    payload: { data, cb },
  };
};
export const uploadAuctionImageSuccess = (data) => ({
  type: UPLOAD_AUCTION_IMAGE_SUCCESS,
  payload: data,
});
export const uploadAuctionImageError = (message) => ({
  type: UPLOAD_AUCTION_IMAGE_ERROR,
  payload: message,
});

export const uploadAuctionVideo = (data, cb) => {
  return {
    type: UPLOAD_AUCTION_VIDEO,
    payload: { data, cb },
  };
};
export const uploadAuctionVideoSuccess = (data) => ({
  type: UPLOAD_AUCTION_VIDEO_SUCCESS,
  payload: data,
});
export const uploadAuctionVideoError = (res) => ({
  type: UPLOAD_AUCTION_VIDEO_ERROR,
  payload: res.message,
});

export const getAuctionTypeSuccess = (data) => {
  return {
    type: GET_ALL_AUCTION_TYPE_SUCCESS,
    payload: data,
  };
};

export const getAuctionTypeError = (data) => {
  return {
    type: GET_ALL_AUCTION_TYPE_ERROR,
    payload: data,
  };
};

export const getAuctionType = (data) => {
  return {
    type: GET_ALL_AUCTION_TYPE,
    payload: data,
  };
};

export const addAuctionType = (data, cb) => {
  return {
    type: ADD_AUCTION_TYPE,
    payload: { data, cb },
  };
};
export const addAuctionTypeSuccess = (data) => {
  return {
    type: ADD_AUCTION_SUCCESS,
    payload: data,
  };
};

export const addAuctionTypeError = (data) => {
  return {
    type: ADD_AUCTION_TYPE,
    payload: data,
  };
};

export const deleteAuctionType = (data, cb) => {
  return {
    type: DELETE_AUCTION_TYPE,
    payload: { data, cb },
  };
};

export const deleteAuctionTypeSuccess = (data) => {
  return {
    type: DELETE_AUCTION_TYPE,
    payload: data,
  };
};
export const deleteAuctionTypeError = (data) => {
  return {
    type: DELETE_AUCTION_TYPE,
    payload: data,
  };
};

export const addAuctionStart = (data, cb) => {
  return {
    type: START_AUCTION,
    payload: { data, cb },
  };
};
export const addAuctionStartSuccess = (data) => {
  return {
    type: START_AUCTION_SUCCESS,
    payload: data,
  };
};
export const addAuctionStartError = (data) => {
  return {
    type: START_AUCTION_ERROR,
    payload: data,
  };
};

export const cancelAuction = (data, cb) => {
  return {
    type: CANCEL_AUCTION,
    payload: { data, cb },
  };
};
export const cancelAuctionSuccess = (data) => {
  return {
    type: CANCEL_AUCTION_SUCCESS,
    payload: data,
  };
};
export const cancelAuctionError = (data) => {
  return {
    type: CANCEL_AUCTION_ERROR,
    payload: data,
  };
};
export const getAnalyticsByAuction = (payload) => {
  return {
    type: GET_AUCTION_ANALYTICS,
    payload,
  };
};
export const getAnalyticsByAuctionSuccess = (payload) => {
  return {
    type: GET_AUCTION_ANALYTICS_SUCCESS,
    payload,
  };
};
export const getAnalyticsByAuctionError = (payload) => {
  return {
    type: GET_AUCTION_ANALYTICS_ERROR,
    payload,
  };
};

export const getAnalyticsByAuctionHouse = (payload) => {
  return {
    type: GET_AUCTION_HOUSE_ANALYTICS,
    payload,
  };
};
export const getAnalyticsByAuctionHouseSuccess = (payload) => {
  return {
    type: GET_AUCTION_HOUSE_ANALYTICS_SUCCESS,
    payload,
  };
};
export const getAnalyticsByAuctionHouseError = (payload) => {
  return {
    type: GET_AUCTION_HOUSE_ANALYTICS_ERROR,
    payload,
  };
};





export const getProductConflicts = (params) => {
  return {
    type: GET_PRODUCT_CONFLICTS,
    payload: params,
  };
};
export const getProductConflictsSuccess = (data) => {
  return {
    type: GET_PRODUCT_CONFLICTS_SUCCESS,
    payload: data,
  };
};
export const getProductConflictsError = (message) => {
  return {
    type: GET_PRODUCT_CONFLICTS_ERROR,
    payload: message,
  };
};

export const deleteProductConflict = (pathParam, cb) => {
  return {
    type: DELETE_PRODUCT_CONFLICT,
    payload: { pathParam, cb },
  };
};
export const deleteProductConflictSuccess = (data) => {
  return {
    type: DELETE_PRODUCT_CONFLICT_SUCCESS,
    payload: data,
  };
};
export const deleteProductConflictError = (data) => {
  return {
    type: DELETE_PRODUCT_CONFLICT_ERROR,
    payload: data.message,
  };
};

export const updateProductConflict = (pathParam, data, cb) => {
  return {
    type: UPDATE_PRODUCT_CONFLICT,
    payload: { pathParam, data, cb },
  };
};
export const updateProductConflictSuccess = (data) => ({
  type: UPDATE_PRODUCT_CONFLICT_SUCCESS,
  payload: data,
});
export const updateProductConflictError = (message) => ({
  type: UPDATE_PRODUCT_CONFLICT_ERROR,
  payload: message,
});


