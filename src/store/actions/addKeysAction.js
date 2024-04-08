import axios from 'axios';
import { ADD_KEYS, ADD_KEYS_ERROR } from '../types';
import { notifyError, notifySuccess } from '../../utils/toast';
import { connectAgainAPI } from './connectAgainAction';
import { handleLogout } from './authAction';

export const addKeys = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const keysData = JSON.stringify({
      exchange: e.exchange.toLowerCase(),
      api_key: e.key,
      secret_key: e.secret,
      passphrase: e.passphrase,
    });

    // Validation for passphrase
    const isValidPassphrase = /^[^\W_]+$/.test(e.passphrase);
    if (!isValidPassphrase) {
      notifyError(
        'Passphrase cannot contain special characters or underscores.'
      );
      return;
    }

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/keys/store_keys`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: keysData,
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: ADD_KEYS,
      });

      dispatch(connectAgainAPI(e.exchange, false));

      notifySuccess(data.message);
    }
  } catch (error) {
    dispatch({
      type: ADD_KEYS_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};
