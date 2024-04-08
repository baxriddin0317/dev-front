/* eslint-disable import/no-anonymous-default-export */
import {
  GET_SUBSCRIPTION_HISTORY,
  GET_SUBSCRIPTION_HISTORY_ERROR,
  GET_ALL_SUBSCRIPTION,
  GET_ALL_SUBSCRIPTION_ERROR,
  GET_ACTIVE_SUBSCRIPTION,
  GET_MEOX_VALUE,
  CREATE_JM_ORDER,
} from '../types';

const initialState = {
  subData: [],
  allSub: [],
  success: false,
  loading: true,
  activeSubscription: [],
  paymentUrl: '/',
  meoxValue: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUBSCRIPTION_HISTORY:
      return {
        ...state,
        subData: action.payload,
        success: true,
        loading: false,
      };
    case CREATE_JM_ORDER:
      return {
        ...state,
        paymentUrl: action.payload,
        success: true,
        loading: false,
      };
    case GET_ACTIVE_SUBSCRIPTION:
      return {
        ...state,
        activeSubscription: action.payload,
        success: true,
        loading: false,
      };
    case GET_MEOX_VALUE:
      return {
        ...state,
        meoxValue: action.payload,
        success: true,
        loading: false,
      };

    case GET_ALL_SUBSCRIPTION:
      return {
        ...state,
        allSub: action.payload,
        success: true,
        loading: false,
      };

    case GET_SUBSCRIPTION_HISTORY_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };
    case GET_ALL_SUBSCRIPTION_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };

    default:
      return state;
  }
}
