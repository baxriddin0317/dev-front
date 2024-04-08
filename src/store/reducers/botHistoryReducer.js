/* eslint-disable import/no-anonymous-default-export */
import { FETCH_BOT_HISTORY_ERROR, FETCH_BOT_HISTORY } from '../types';

const initialState = {
  botHistoryData: [],
  success: false,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOT_HISTORY:
      return {
        ...state,
        botHistoryData: action.payload,
        success: true,
        loading: false,
      };

    case FETCH_BOT_HISTORY_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };

    default:
      return state;
  }
}
