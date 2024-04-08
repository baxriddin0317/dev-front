import axios from 'axios';
import { CANCEL_BOT, CANCEL_BOT_ERROR } from '../types';
import { fetchBotList } from './createBotAction';
import { notifyError, notifySuccess } from '../../utils/toast';
import { handleLogout } from './authAction';

export const cancelBot = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const botID = JSON.stringify({
      bot_id: e,
    });
    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_API_BASE_URL}/bot/cancel-bot`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: botID,
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: CANCEL_BOT,
      });

      notifySuccess(data.message);

      dispatch(fetchBotList());
    }
  } catch (error) {
    dispatch({
      type: CANCEL_BOT_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};
