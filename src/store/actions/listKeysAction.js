import axios from 'axios';
import { FETCH_KEYS, FETCH_KEYS_ERROR } from '../types';
import { notifyError } from '../../utils/toast';
import { handleLogout } from './authAction';

export const getKeysData = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/keys/fetch-keys`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: FETCH_KEYS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_KEYS_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};
