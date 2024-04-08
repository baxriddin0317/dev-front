import axios from 'axios';
import { CANCEL_BID, CANCEL_BID_ERROR } from '../types';
import { getBotHistoryData } from './botHistoryAction';
import { getBotStatusData } from './botStatusAction';
import { notifyError, notifySuccess } from '../../utils/toast';
import { handleLogout } from './authAction';

export const cancelBid = (e, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const orderID = JSON.stringify({
      order_id: e,
    });
    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_API_BASE_URL}/bids/cancel-bid/`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: orderID,
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: CANCEL_BID,
      });

      notifySuccess(data.message);
      dispatch(getBotHistoryData(id));
      dispatch(getBotStatusData(id));
    }
  } catch (error) {
    dispatch({
      type: CANCEL_BID_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const activateBid = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_API_BASE_URL}/bids/${id}/activate`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const res = await axios(config);
    const { data } = res;
    dispatch({
      type: 'ACTIVE_BID',
    });
    notifySuccess(data.message);
  } catch (error) {
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};
