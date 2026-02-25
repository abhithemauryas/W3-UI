import {
  CREATE_TERMS_AND_CONDITION,
  CREATE_TERMS_AND_CONDITION_ERROR,
  CREATE_TERMS_AND_CONDITION_SUCCESS,
  GET_TERMS_AND_CONDITION,
  GET_TERMS_AND_CONDITION_ERROR,
  GET_TERMS_AND_CONDITION_SUCCESS,
  UPDATE_TERMS_AND_CONDITION,
  UPDATE_TERMS_AND_CONDITION_ERROR,
  UPDATE_TERMS_AND_CONDITION_SUCCESS,
} from './constant.termsAndCondition';

const INIT_STATE = {
  termsCon: {},
  loading: false,
  error: '',
  errorMessage: '',
  successMesage: '',
  id: '',
  metadata: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_TERMS_AND_CONDITION:
      return {
        ...state,
        loading: true,
        errorMessage: '',
        successMesage: '',
      };
    case CREATE_TERMS_AND_CONDITION_SUCCESS:
      return {
        ...state,
        loading: false,
        successMesage: action.payload?.message,
      };
    case CREATE_TERMS_AND_CONDITION_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload?.message,
      };
    case UPDATE_TERMS_AND_CONDITION:
      return {
        ...state,
        loading: true,
        errorMessage: '',
        successMesage: '',
      };
    case UPDATE_TERMS_AND_CONDITION_SUCCESS:
      return {
        ...state,
        loading: false,
        successMesage: action.payload?.message,
      };
    case UPDATE_TERMS_AND_CONDITION_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload?.message,
      };
    case GET_TERMS_AND_CONDITION:
      return {
        ...state,
        loading: true,
      };
    case GET_TERMS_AND_CONDITION_SUCCESS:
      return {
        ...state,
        loading: false,
        termsCon: action.payload?.data?.content,
        id: action.payload?.data?.id,
      };
    case GET_TERMS_AND_CONDITION_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload?.message,
      };
    default:
      return { ...state };
  }
};
