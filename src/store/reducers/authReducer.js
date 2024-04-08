/* eslint-disable import/no-anonymous-default-export */
import {
  AUTH_LOGIN,
  AUTH_LOGIN_START,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_SIGNUP_ERROR,
  AUTH_SIGNUP,
  AUTH_LOGIN_2FA,
} from '../types';

const initialState = {
  isLoggedIn: !!localStorage.getItem('token_key'),
  auth2fa: false,
  token: '',
  authError: false,
  authErrorMsg: '',
  success: false,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGIN_2FA:
      return {
        ...state,
        isLoggedIn: false,
        auth2fa: true,
      };
    case AUTH_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.access_token,
        success: true,
        loading: false,
      };
    case AUTH_SIGNUP:
      return {
        ...state,
        isLoggedIn: !!localStorage.getItem('token_key'),
        token: action.payload.token,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        token: '',
        authError: true,
        authErrorMsg: action.payload,
        loading: false,
      };
    case AUTH_SIGNUP_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        token: '',
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: '',
      };

    default:
      return state;
  }
}
