/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_REF_USER_ERROR,
  ADD_REF_USER,
  ADD_REFCODE_ERROR,
  ADD_REFCODE,
} from '../types';

const initialState = {
  refcode: '',
  refcount: 0,
  refusers: [],
  affiliatebalance: 0,
  success: false,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_REF_USER:
      return {
        ...state,
        refcount: action.payload.totalcount,
        refusers: action.payload.affiliates,
        affiliatebalance: action.payload.affiliateEarnings,
        success: true,
        loading: false,
      };
    case ADD_REF_USER_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };
    case ADD_REFCODE:
      return {
        ...state,
        refcode: action.payload.refcode,
        success: true,
        loading: false,
      };
    case ADD_REFCODE_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };

    default:
      return state;
  }
}
