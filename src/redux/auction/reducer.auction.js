import {
  ADD_AUCTION,
  ADD_AUCTION_ERROR,
  ADD_AUCTION_SUCCESS,
  ADD_AUCTION_TYPE,
  ADD_AUCTION_TYPE_ERROR,
  ADD_AUCTION_TYPE_SUCCESS,
  CANCEL_AUCTION,
  CANCEL_AUCTION_ERROR,
  CANCEL_AUCTION_SUCCESS,
  DELETE_AUCTION,
  DELETE_AUCTION_ERROR,
  DELETE_AUCTION_SUCCESS,
  DELETE_AUCTION_TYPE,
  DELETE_AUCTION_TYPE_ERROR,
  DELETE_AUCTION_TYPE_SUCCESS,
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

const INIT_STATE = {
  auctions: [],
  auctioncategories: [],
  productConflicts: [],
  imageData: {},
  loading: false,
  analyticsLoading: false,
  errorMessage: '',
  successMesage: '',
  metadata: {},
  auctionTypes: [],
  auctionsAnalytics: {},
  auctionData: {},
  auctionHouseAnalytics: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_AUCTIONS:
      return {
        ...state,
        loading: true,
        auctions: [],
        successMesage: '',
        errorMessage: '',
      };
    case GET_AUCTIONS_SUCCESS:
      return {
        ...state,
        auctions: [...action.payload.data.Auctions],
        metadata: action.payload.metadata,
        loading: false,
        errorMessage: '',
      };
    case GET_AUCTIONS_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload?.message,
        loading: false,
      };
    case ADD_AUCTION:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case ADD_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
        successMesage: action.payload?.message,
      };
    case ADD_AUCTION_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        loading: false,
        successMesage: '',
      };
    case DELETE_AUCTION:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case DELETE_AUCTION_SUCCESS:
      return {
        ...state,
        successMesage: action.payload?.message,
        errorMessage: '',
        loading: false,
      };
    case DELETE_AUCTION_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload,
        loading: false,
      };
    case UPDATE_AUCTION:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case UPDATE_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
        successMesage: action.payload?.message,
      };
    case UPDATE_AUCTION_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        loading: false,
        successMesage: '',
      };
    case GET_AUCTION:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case GET_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        auctionData: action?.payload,
      };
    case GET_AUCTION_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload?.message,
        loading: false,
      };
    case GET_AUCTION_CATEGORY:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case GET_AUCTION_CATEGORY_SUCCESS:
      return {
        ...state,
        auctioncategories: [...action.payload.data],
        loading: false,
        errorMessage: '',
      };
    case GET_AUCTION_CATEGORY_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        loading: false,
        successMesage: '',
      };
    case UPLOAD_AUCTION_IMAGE:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case UPLOAD_AUCTION_IMAGE_SUCCESS:
      return {
        ...state,
        successMesage: action.payload?.message,
        imageData: action.payload.data,
        loading: false,
        errorMessage: '',
      };
    case UPLOAD_AUCTION_IMAGE_ERROR:
      return {
        ...state,
        errorMessage: action.payload?.message,
        loading: false,
        successMesage: '',
      };
    case UPLOAD_AUCTION_VIDEO:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case UPLOAD_AUCTION_VIDEO_SUCCESS:
      return {
        ...state,
        successMesage: action.payload?.message,
        imageData: action.payload.data,
        loading: false,
        errorMessage: '',
      };
    case UPLOAD_AUCTION_VIDEO_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
        successMesage: '',
      };
    case GET_ALL_AUCTION_TYPE:
      return {
        ...state,
        loading: true,
        auctionTypes: action.payload,
        successMesage: '',
        errorMessage: '',
      };
    case GET_ALL_AUCTION_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        auctionTypes: action.payload.data,
        successMesage: '',
        errorMessage: '',
      };
    case GET_ALL_AUCTION_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        successMesage: '',
        errorMessage: action.payload?.message,
      };

    case ADD_AUCTION_TYPE:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case ADD_AUCTION_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        successMesage: action.payload,
        errorMessage: '',
      };
    case ADD_AUCTION_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        successMesage: '',
        errorMessage: action.payload,
      };

    case DELETE_AUCTION_TYPE:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case DELETE_AUCTION_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        successMesage: action.payload,
        errorMessage: '',
      };
    case DELETE_AUCTION_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        successMesage: '',
        errorMessage: action.payload,
      };
    case START_AUCTION:
      return {
        ...state,
        successMesage: '',
        errorMessage: '',
      };
    case START_AUCTION_SUCCESS:
      return {
        ...state,
        successMesage: action.payload.message,
      };
    case START_AUCTION_ERROR:
      return {
        ...state,
        errorMessage: action.payload.message,
      };

    case CANCEL_AUCTION:
      return {
        ...state,
        loading: true,
        successMesage: '',
        errorMessage: '',
      };
    case CANCEL_AUCTION_SUCCESS:
      return {
        ...state,
        successMesage: action.payload?.message,
        errorMessage: '',
        loading: false,
      };
    case CANCEL_AUCTION_ERROR:
      return {
        ...state,
        successMesage: '',
        errorMessage: action.payload,
        loading: false,
      };

    case GET_AUCTION_ANALYTICS:
    case GET_AUCTION_HOUSE_ANALYTICS:
      return {
        ...state,
        analyticsLoading: true,
        successMesage: '',
        errorMessage: '',
      };

    case GET_AUCTION_ANALYTICS_SUCCESS:
      return {
        ...state,
        analyticsLoading: false,
        auctionsAnalytics: action.payload,
      };
    case GET_AUCTION_HOUSE_ANALYTICS_SUCCESS:
      return {
        ...state,
        analyticsLoading: false,
        auctionHouseAnalytics: action.payload,
      };

    case GET_AUCTION_ANALYTICS_ERROR:
    case GET_AUCTION_HOUSE_ANALYTICS_ERROR:
      return {
        ...state,
        analyticsLoading: false,
      };
      case GET_PRODUCT_CONFLICTS:
        return {
          ...state,
          loading: true,
          productConflicts: [],
          successMesage: '',
          errorMessage: '',
        };
      case GET_PRODUCT_CONFLICTS_SUCCESS:
        return {
          ...state,
          productConflicts: action.payload?.data
            ? [...action.payload.data]
            : [],
          metadata: action.payload.metadata,
          loading: false,
          errorMessage: '',
        };
      case GET_PRODUCT_CONFLICTS_ERROR:
        return {
          ...state,
          successMesage: '',
          errorMessage: action.payload?.message,
          loading: false,
        };
      case DELETE_PRODUCT_CONFLICT:
        return {
          ...state,
          loading: true,
          successMesage: '',
          errorMessage: '',
        };
      case DELETE_PRODUCT_CONFLICT_SUCCESS:
        return {
          ...state,
          successMesage: action.payload?.message || '',
          errorMessage: '',
          loading: false,
        };
      case DELETE_PRODUCT_CONFLICT_ERROR:
        return {
          ...state,
          successMesage: '',
          errorMessage: action.payload?.message || action.payload || '',
          loading: false,
        };
      case UPDATE_PRODUCT_CONFLICT:
        return {
          ...state,
          loading: true,
          successMesage: '',
          errorMessage: '',
        };
      case UPDATE_PRODUCT_CONFLICT_SUCCESS:
        return {
          ...state,
          successMesage: action.payload?.message || '',
          errorMessage: '',
          loading: false,
        };
      case UPDATE_PRODUCT_CONFLICT_ERROR:
        return {
          ...state,
          successMesage: '',
          errorMessage: action.payload?.message || action.payload || '',
          loading: false,
        };
    default:
      return { ...state };
  }
};
