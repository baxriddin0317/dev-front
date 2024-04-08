/* eslint-disable import/no-anonymous-default-export */
import { FETCH_BOT_STATUS_ERROR, FETCH_BOT_STATUS } from '../types';

const initialState = {
  botStatusData: [],
  success: false,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOT_STATUS:
      return {
        ...state,
        botStatusData: action.payload,
        success: true,
        loading: false,
      };

    case FETCH_BOT_STATUS_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };

    default:
      return state;
  }
}
