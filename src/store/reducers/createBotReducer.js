/* eslint-disable import/no-anonymous-default-export */
import {
  GET_COIN,
  GET_MARKETS,
  GET_MARKETS_ERROR,
  GET_COIN_ERROR,
  REMOVE_OLD_COIN,
  PRECISION_PRICE,
  ALL_PRECISION_PRICE,
  PRECISION_PRICE_ERROR,
  ALL_PRECISION_PRICE_ERROR,
  FETCH_BOT_LIST,
  FETCH_BOT_LIST_ERROR,
  GET_BALANCE,
  CREATE_BOT_ERROR,
} from '../types';

const initialState = {
  markets: [],
  loading: true,
  coins: [],
  freeBots: null,
  activeBots: null,
  precision: {},
  allprecision: [],
  botList: [],
  balance: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_BOT_ERROR:
      return {
        ...state,
        freeBots: action.payload.free,
        activeBots: action.payload.used,
        loading: false,
      };

    case GET_MARKETS:
      return {
        ...state,
        loading: false,
        markets: action.payload,
      };

    case GET_BALANCE:
      return {
        ...state,
        loading: false,
        balance: action.payload,
      };

    case FETCH_BOT_LIST:
      return {
        ...state,
        loading: false,
        botList: action.payload,
      };

    case GET_MARKETS_ERROR:
      return {
        ...state,
        loading: true,
      };

    case FETCH_BOT_LIST_ERROR:
      return {
        ...state,
        loading: true,
      };
    case GET_COIN:
      return {
        ...state,
        loading: false,
        coins: action.payload,
      };
    case PRECISION_PRICE:
      return {
        ...state,
        loading: false,
        precision: action.payload,
      };
    case ALL_PRECISION_PRICE:
      return {
        ...state,
        loading: false,
        allprecision: action.payload,
      };
    case ALL_PRECISION_PRICE_ERROR:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_OLD_COIN:
      return {
        ...state,
        coins: action.payload,
      };

    case GET_COIN_ERROR:
      return {
        ...state,
        loading: true,
      };
    case PRECISION_PRICE_ERROR:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
