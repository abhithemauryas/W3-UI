import {
  GET_REVENUE_LIST,
  GET_REVENUE_LIST_ERROR,
  GET_REVENUE_LIST_SUCCESS,
} from './constants.revenue';

export const getRevenueList = (auctionId, params) => {
  return {
    type: GET_REVENUE_LIST,
    payload: { auctionId, params },
  };
};
export const getRevenueListSuccess = (data) => {
  return {
    type: GET_REVENUE_LIST_SUCCESS,
    payload: data,
  };
};
export const getRevenueListError = (message) => {
  return {
    type: GET_REVENUE_LIST_ERROR,
    payload: message,
  };
};
