import axios from 'axios';
import { FETCH_BID_ERROR, FETCH_BID_ERROR_ERROR } from '../types';
import { notifyError } from '../../utils/toast';
import { handleLogout } from './authAction';

export const fetchBidErrorData = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/bids/fetch-error-bids`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;
    if (status === 200) {
      dispatch({
        type: FETCH_BID_ERROR,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_BID_ERROR_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};
