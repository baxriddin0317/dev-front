/* eslint-disable import/no-anonymous-default-export */
import { FETCH_BID_ERROR, FETCH_BID_ERROR_ERROR } from '../types';

const initialState = {
  botErrorData: [],
  success: false,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BID_ERROR:
      return {
        ...state,
        botErrorData: action.payload,
        success: true,
        loading: false,
      };

    case FETCH_BID_ERROR_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };

    default:
      return state;
  }
}
