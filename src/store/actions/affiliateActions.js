import axios from 'axios';
import {
  ADD_REF_USER_ERROR,
  ADD_REF_USER,
  ADD_REFCODE_ERROR,
  ADD_REFCODE,
} from '../types';
import { notifyError, notifySuccess } from '../../utils/toast';
import { handleLogout } from './authAction';

export const refCode = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/affiliate/userrefcode`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: ADD_REFCODE,
        payload: data,
      });
      notifySuccess(data.message);
    }
  } catch (error) {
    dispatch({
      type: ADD_REFCODE_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const affiliateUsers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/affiliate/useraffiliates`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: ADD_REF_USER,
        payload: data,
      });
      notifySuccess(data.message);
    }
  } catch (error) {
    dispatch({
      type: ADD_REF_USER_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};
