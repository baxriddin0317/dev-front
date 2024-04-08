/* eslint-disable import/no-anonymous-default-export */
import { FETCH_KEYS, FETCH_KEYS_ERROR } from '../types';

const initialState = {
  allKeys: [],
  success: false,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_KEYS:
      return {
        ...state,
        allKeys: action.payload,
        success: true,
        loading: false,
      };

    case FETCH_KEYS_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };

    default:
      return state;
  }
}
