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
  GET_AUCTION_HOUSE,
  GET_AUCTION_HOUSE_ERROR,
  GET_AUCTION_HOUSE_SUCCESS,
  GET_XP_RECORDS,
  GET_XP_RECORDS_ERROR,
  GET_XP_RECORDS_SUCCESS,
  GET_XP_RECORDS_CLAN_WISE,
  GET_XP_RECORDS_CLAN_WISE_ERROR,
  GET_XP_RECORDS_CLAN_WISE_SUCCESS,
  GET_AUCTION_HOUSE_FOR_DROPDOWN,
  GET_AUCTION_HOUSE_FOR_DROPDOWN_SUCCESS,
  GET_AUCTION_HOUSE_FOR_DROPDOWN_ERROR,
} from './constants.auctionHouse';

const INIT_STATE = {
  auctionHouseData: [],
  auctionHouseDropdownData: [],
  xpRecords: [],
  xpRecordsClanWise: [],
  loading: false,
  deleteAuctionLoading: false,
  errorMessage: '',
  successMesage: '',
  deleteAuctionHouseErrorMessage: '',
  deleteAuctionHouseSuccessMesage: '',
  metadata: {},
  auctionCategoryList: [],
  forceAuctionLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_AUCTION_HOUSE:
      return {
        ...state,
        loading: true,
        auctionHouseData: [],
        successMesage: '',
        errorMessage: '',
      };
    case GET_AUCTION_HOUSE_FOR_DROPDOWN:
      return {
        ...state,
        loading: true,
        auctionHouseDropdownData: [],
        successMesage: '',
        errorMessage: '',
      };
    case GET_AUCTION_HOUSE_FOR_DROPDOWN_SUCCESS:
      return {
        ...state,
        auctionHouseDropdownData: action.payload.data,
        loading: false,
        errorMessage: '',
      };
    case GET_AUCTION_HOUSE_FOR_DROPDOWN_ERROR:
      return {
        ...state,
        errorMessage: action.payload.message,
        loading: false,
        successMesage: '',
      };
    case GET_AUCTION_HOUSE_SUCCESS:
      return {
        ...state,
        auctionHouseData: [...action.payload.data],
        metadata: action.payload.metadata,
        loading: false,
        errorMessage: '',
      };
    case GET_AUCTION_HOUSE_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload?.message,
        loading: false,
      };
    case DELETE_AUCTION_HOUSE:
      return {
        ...state,
        deleteAuctionLoading: true,
        deleteAuctionHouseErrorMessage: '',
        deleteAuctionHouseSuccessMesage: '',
      };
    case DELETE_AUCTION_HOUSE_SUCCESS:
      return {
        ...state,
        deleteAuctionHouseSuccessMesage: action.payload?.message,
        deleteAuctionHouseErrorMessage: '',
        deleteAuctionLoading: false,
      };
    case DELETE_AUCTION_HOUSE_ERROR:
      return {
        ...state,
        deleteAuctionHouseErrorMessage: action.payload?.message,
        deleteAuctionHouseSuccessMesage: '',
        deleteAuctionLoading: false,
      };
    case GET_AUCTION_CATEGORY_LIST:
    case GET_AUCTION_CATEGORY_LIST_ERROR:
      return { ...state, auctionCategoryList: [] };
    case GET_AUCTION_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        auctionCategoryList: action?.payload?.data,
      };

    case FORCE_STOP_AUCTION:
      return { ...state, forceAuctionLoading: true };

    case FORCE_STOP_AUCTION_SUCCESS:
      return { ...state, forceAuctionLoading: false };

    case FORCE_STOP_AUCTION_ERROR:
      return { ...state, forceAuctionLoading: false };

    case GET_XP_RECORDS:
      return { ...state, xpRecords: [], loading: true };
    case GET_XP_RECORDS_SUCCESS:
      return { ...state, xpRecords: action.payload, loading: false };
    case GET_XP_RECORDS_ERROR:
      return { ...state, xpRecords: [], loading: false };
    case GET_XP_RECORDS_CLAN_WISE:
      return { ...state, xpRecordsClanWise: [], loading: true };
    case GET_XP_RECORDS_CLAN_WISE_SUCCESS:
      return { ...state, xpRecordsClanWise: action.payload, loading: false };
    case GET_XP_RECORDS_CLAN_WISE_ERROR:
      return { ...state, xpRecordsClanWise: [], loading: false };
    default:
      return { ...state };
  }
};
