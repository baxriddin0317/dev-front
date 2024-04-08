/* eslint-disable import/no-anonymous-default-export */
import {
  GET_BUY_LINK,
  GET_BUY_LINK_ERROR,
  PAYMENT_CHECK,
  PAYMENT_CHECK_ERROR,
} from '../types';

const initialState = {
  buyLink: {},
  paymentDone: false,
  success: false,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BUY_LINK:
      return {
        ...state,
        buyLink: action.payload,
        success: true,
        loading: false,
      };

    case GET_BUY_LINK_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };

    case PAYMENT_CHECK:
      return {
        ...state,
        paymentDone: action.payload,
        success: true,
        loading: false,
      };

    case PAYMENT_CHECK_ERROR:
      return {
        ...state,
        paymentDone: false,
        loading: true,
      };

    default:
      return state;
  }
}
