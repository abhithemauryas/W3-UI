import {
  DELETE_AUCTION_HOUSE,
  DELETE_AUCTION_HOUSE_ERROR,
  DELETE_AUCTION_HOUSE_SUCCESS,
  FORCE_STOP_AUCTION,
  FORCE_STOP_AUCTION_ERROR,
  FORCE_STOP_AUCTION_SUCCESS,
  GET_AUCTION_CATEGORY_LIST,
  GET_AUCTION_CATEGORY_LIST_ERROR,
  GET_AUCTION_CATEGORY_LIST_SUCCESS,
  GET_AUCTION_CATEGORY_PERMISSION,
  GET_AUCTION_HOUSE,
  GET_AUCTION_HOUSE_ERROR,
  GET_AUCTION_HOUSE_SUCCESS,
  GET_AUCTION_HOUSE_FOR_DROPDOWN,
  GET_AUCTION_HOUSE_FOR_DROPDOWN_ERROR,
  GET_AUCTION_HOUSE_FOR_DROPDOWN_SUCCESS,
  UPDATE_AUCTION_CATEGORY_PERMISSION,
  UPDATE_AUCTION_HOUSE_CURRENCY,
  GET_XP_RECORDS,
  GET_XP_RECORDS_ERROR,
  GET_XP_RECORDS_SUCCESS,
  GET_XP_RECORDS_CLAN_WISE,
  GET_XP_RECORDS_CLAN_WISE_ERROR,
  GET_XP_RECORDS_CLAN_WISE_SUCCESS,
} from './constants.auctionHouse';

export const getAuctionHouse = (params) => {
  return {
    type: GET_AUCTION_HOUSE,
    payload: { params },
  };
};
export const getAuctionHouseSuccess = (data) => ({
  type: GET_AUCTION_HOUSE_SUCCESS,
  payload: data,
});
export const getAuctionHouseError = (message) => ({
  type: GET_AUCTION_HOUSE_ERROR,
  payload: message,
});


export const getAuctionHouseForDropdown = (params) => {
  return {
    type: GET_AUCTION_HOUSE_FOR_DROPDOWN,
    payload: { params },
  };
};
export const getAuctionHouseSuccessForDropdown = (data) => ({
  type: GET_AUCTION_HOUSE_FOR_DROPDOWN_SUCCESS,
  payload: data,
});
export const getAuctionHouseErrorForDropdown = (message) => ({
  type: GET_AUCTION_HOUSE_FOR_DROPDOWN_ERROR,
  payload: message,
});
export const deleteAuctionHouse = (params, cb) => {
  return {
    type: DELETE_AUCTION_HOUSE,
    payload: { params, cb },
  };
};
export const deleteAuctionHouseSuccess = (data) => ({
  type: DELETE_AUCTION_HOUSE_SUCCESS,
  payload: data,
});
export const deleteAuctionHouseError = (message) => ({
  type: DELETE_AUCTION_HOUSE_ERROR,
  payload: message,
});

export const getAuctionCategoryList = (payload) => ({
  type: GET_AUCTION_CATEGORY_LIST,
  payload,
});

export const getAuctionCategoryListSuccess = (payload) => ({
  type: GET_AUCTION_CATEGORY_LIST_SUCCESS,
  payload,
});

export const getAuctionCategoryListError = () => ({
  type: GET_AUCTION_CATEGORY_LIST_ERROR,
});

export const getAuctionCategoryPermission = (payload) => ({
  type: GET_AUCTION_CATEGORY_PERMISSION,
  payload,
});

export const updateAuctionCategoryPermission = (payload) => ({
  type: UPDATE_AUCTION_CATEGORY_PERMISSION,
  payload,
});

export const updateAuctionCategoryCurrency = (payload) => ({
  type: UPDATE_AUCTION_HOUSE_CURRENCY,
  payload,
});

export const forceStopAuction = (payload) => ({
  type: FORCE_STOP_AUCTION,
  payload,
});
export const forceStopAuctionSuccess = (payload) => ({
  type: FORCE_STOP_AUCTION_SUCCESS,
  payload,
});
export const forceStopAuctionError = (payload) => ({
  type: FORCE_STOP_AUCTION_ERROR,
  payload,
});

export const getXpRecords = (payload) => ({
  type: GET_XP_RECORDS,
  payload,
});
export const getXpRecordsSuccess = (payload) => ({
  type: GET_XP_RECORDS_SUCCESS,
  payload,
});
export const getXpRecordsError = (payload) => ({
  type: GET_XP_RECORDS_ERROR,
  payload,
});

export const getXpRecordsClanWise = (payload) => ({
  type: GET_XP_RECORDS_CLAN_WISE,
  payload,
});
export const getXpRecordsClanWiseSuccess = (payload) => ({
  type: GET_XP_RECORDS_CLAN_WISE_SUCCESS,
  payload,
});
export const getXpRecordsClanWiseError = (payload) => ({
  type: GET_XP_RECORDS_CLAN_WISE_ERROR,
  payload,
});