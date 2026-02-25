import {
  GET_CONSUMED_AUCTION_PLAYS,
  GET_CONSUMED_AUCTION_PLAYS_ERROR,
  GET_CONSUMED_AUCTION_PLAYS_SUCCESS,
} from './constants.auctionPlayConsumed';

export const getAuctionPlayConsumed = (auctionId, params) => {
  return {
    type: GET_CONSUMED_AUCTION_PLAYS,
    payload: { auctionId, params },
  };
};
export const getAuctionPlayConsumedSuccess = (data) => {
  return {
    type: GET_CONSUMED_AUCTION_PLAYS_SUCCESS,
    payload: data,
  };
};
export const getAuctionPlayConsumedError = (message) => {
  return {
    type: GET_CONSUMED_AUCTION_PLAYS_ERROR,
    payload: message,
  };
};
