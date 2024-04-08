import axios from 'axios';
import {
  FETCH_2FA,
  FETCH_2FA_ERROR,
  ENABLE_2FA,
  ENABLE_2FA_ERROR,
  DISABLE_2FA,
  DISABLE_2FA_ERROR,
} from '../types';
import { notifyError, notifySuccess } from '../../utils/toast';
import { handleLogout } from './authAction';

export const get2fa = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/2fa`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: FETCH_2FA,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_2FA_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const enable2fa = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/2fa/${e}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: ENABLE_2FA,
      });
      notifySuccess(data.message);
    }
  } catch (error) {
    dispatch({
      type: ENABLE_2FA_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const disable2fa = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/disable/2fa`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: e,
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: DISABLE_2FA,
      });
      notifySuccess(data.message);
    }
  } catch (error) {
    dispatch({
      type: DISABLE_2FA_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};
