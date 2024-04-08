import axios from 'axios';
import { CONNECT_AGAIN, CONNECT_AGAIN_ERROR } from '../types';
import { notifyError, notifySuccess } from '../../utils/toast';
import { getKeysData } from './listKeysAction';
import { handleLogout } from './authAction';

export const connectAgainAPI =
  (e, showMessage = true) =>
  async (dispatch) => {
    try {
      const exchangeName = {
        exchange: e.toLowerCase(),
      };
      const token = localStorage.getItem('token_key');
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_BASE_URL}/keys/connect-again`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: exchangeName,
      };

      const res = await axios(config);
      const { data, status } = res;

      if (status === 200) {
        dispatch({
          type: CONNECT_AGAIN,
        });
        if (showMessage) {
          notifySuccess(data.message);
          dispatch(getKeysData());
        }
      }
    } catch (error) {
      dispatch({
        type: CONNECT_AGAIN_ERROR,
        payload: error.response.data.message,
      });
      if (error.response.data.message === 'Invalid token') {
        dispatch(handleLogout());
        return;
      }
      notifyError(error.response.data.message);
    }
  };
