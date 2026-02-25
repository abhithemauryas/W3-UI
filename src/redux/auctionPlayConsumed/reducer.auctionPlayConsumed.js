import {
  GET_CONSUMED_AUCTION_PLAYS,
  GET_CONSUMED_AUCTION_PLAYS_ERROR,
  GET_CONSUMED_AUCTION_PLAYS_SUCCESS,
} from './constants.auctionPlayConsumed';

const INIT_STATE = {
  auctionPlayConsumedList: [],
  loading: false,
  errorMessage: '',
  successMessage: '',
  metadata: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CONSUMED_AUCTION_PLAYS:
      return {
        ...state,
        loading: true,
        auctionPlayConsumedList: [],
        successMessage: '',
        errorMessage: '',
      };
    case GET_CONSUMED_AUCTION_PLAYS_SUCCESS:
      return {
        ...state,
        auctionPlayConsumedList: [...action.payload.data],
        metadata: action.payload.metadata,
        loading: false,
        errorMessage: '',
      };
    case GET_CONSUMED_AUCTION_PLAYS_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload?.message,
        loading: false,
      };

    default:
      return { ...state };
  }
};
