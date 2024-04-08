import { notifyError, notifySuccess } from 'utils/toast';
import axios from 'axios';
import { DELETE_KEY, DELETE_KEY_ERROR } from '../types';
import { getKeysData } from './listKeysAction';
import { handleLogout } from './authAction';

export const deleteKey = (e) => async (dispatch) => {
  try {
    const exchangeName = {
      exchange: e.toLowerCase(),
    };
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_API_BASE_URL}/keys/delete-keys`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: exchangeName,
    };

    const res = await axios(config);

    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: DELETE_KEY,
      });
      dispatch(getKeysData());
      notifySuccess(data.message);
    }
  } catch (error) {
    dispatch({
      type: DELETE_KEY_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};
