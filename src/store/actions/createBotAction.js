import axios from 'axios';
import {
  GET_MARKETS,
  GET_MARKETS_ERROR,
  PRECISION_PRICE,
  PRECISION_PRICE_ERROR,
  ALL_PRECISION_PRICE,
  ALL_PRECISION_PRICE_ERROR,
  FETCH_BOT_LIST,
  FETCH_BOT_LIST_ERROR,
  GET_COIN,
  GET_COIN_ERROR,
  REMOVE_OLD_COIN,
  GET_BALANCE,
  GET_BALANCE_ERROR,
} from '../types';
import { handleLogout } from './authAction';
import { notifyError, notifySuccess } from '../../utils/toast';

export const getMarkets = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/markets/${e}/get-markets`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    const marketArray = [];
    data.map((d) => {
      marketArray.push({
        label: d,
        value: d,
      });
    });

    if (status === 200) {
      dispatch({
        type: GET_MARKETS,
        payload: marketArray,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_MARKETS_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const getCoin = (market, exchange) => async (dispatch) => {
  dispatch({
    type: REMOVE_OLD_COIN,
    payload: [],
  });
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/markets/${exchange}/get-coins/${market}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    const coinArray = [];
    data.map((d) => {
      coinArray.push({
        label: d,
        value: d,
      });
    });

    if (status === 200) {
      dispatch({
        type: GET_COIN,
        payload: coinArray,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_COIN_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const createBot = async (e) => {
  try {
    const token = localStorage.getItem('token_key');
    const botData = {
      market: e.market.value,
      coin: e.coins.value,
      amount: e.amount,
      lot: e.lot,
      size: e.amountSize,
      coin_size: e.coinSize,
      start: e.startPrice,
      step: e.step,
      botType: e.botType ? e.botType : 1,
      exchange: e.exchanges.value.toLowerCase(),
      type: e.buyOrSell.value.toUpperCase(),
    };

    const config = {
      method: 'post',

      url: `${process.env.REACT_APP_API_BASE_URL}/bot/create-bot`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: botData,
    };

    const res = await axios(config);

    const { data, status } = res;

    if (status === 200) {
      notifySuccess(data.message);
    }
    return {};
  } catch (error) {
    if (error.response.status == 419) {
      return error.response.data;
    }
    notifyError(error.response.data.message);
    return {};
  }
};

export const getAllPrecision = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/markets/${e}/get-all`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: ALL_PRECISION_PRICE,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: ALL_PRECISION_PRICE_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const getPrecision = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/markets/${e.exchange}/get-market-precision/${e.market}/${e.coin}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: PRECISION_PRICE,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: PRECISION_PRICE_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const fetchBalance = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/markets/${e}/balance`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);

    const { data, status } = res;
    if (status === 200) {
      dispatch({
        type: GET_BALANCE,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_BALANCE_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const fetchBotList = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/bot/fetch-bot?${e}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: FETCH_BOT_LIST,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_BOT_LIST_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};
