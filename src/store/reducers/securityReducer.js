/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_2FA,
  FETCH_2FA_ERROR,
  ENABLE_2FA,
  ENABLE_2FA_ERROR,
  DISABLE_2FA,
  DISABLE_2FA_ERROR,
} from '../types';

const initialState = {
  qr: '',
  secret: '',
  auth2fa: false,
  success: false,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_2FA:
      return {
        ...state,
        qr: action.payload.qr,
        auth2fa: action.payload.enabled,
        secret: action.payload.secret,
        success: true,
        loading: false,
      };
    case FETCH_2FA_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };
    case ENABLE_2FA:
      return {
        ...state,
        auth2fa: true,
        success: true,
        loading: false,
      };
    case ENABLE_2FA_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };
    case DISABLE_2FA:
      return {
        ...state,
        auth2fa: false,
        success: true,
        loading: false,
      };
    case DISABLE_2FA_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };
    default:
      return state;
  }
}
