/* eslint-disable import/no-anonymous-default-export */
import { PROFILE_NFT, PROFILE_NFT_ERROR } from '../types';

const initialState = {
  NFT: [],
  success: false,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_NFT:
      return {
        ...state,
        NFT: action.payload,
        success: true,
        loading: false,
      };

    case PROFILE_NFT_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };

    default:
      return state;
  }
}
