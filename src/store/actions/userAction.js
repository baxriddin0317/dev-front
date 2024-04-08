import axios from 'axios';
import { notifyError, notifySuccess } from '../../utils/toast';
import {
  PROFILE_UPDATE,
  PROFILE_UPDATE_ERROR,
  PROFILE_NFT,
  PROFILE_NFT_ERROR,
} from '../types';
import { handleLogout } from './authAction';

export const updateProfile = (e) => async (dispatch) => {
  const data = Object.entries(e).reduce(
    (a, [k, v]) => (v ? ((a[k] = v), a) : a),
    {}
  );

  try {
    const postData = JSON.stringify({
      data,
    });
    const tokenKey = localStorage.getItem('token_key');

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/admin/update-profile`,
      headers: {
        Authorization: `Bearer ${tokenKey}`,
        'Content-Type': 'application/json',
      },
      data: postData,
    };
    const res = await axios(config);

    if (res.status === 200) {
      const { token, ...rest } = res.data;
      localStorage.removeItem('token_key');
      localStorage.removeItem('user_detail');

      localStorage.setItem('token_key', token);
      notifySuccess('Profile Updated Successfully!');
      dispatch({
        type: PROFILE_UPDATE,
        payload: res,
      });
      localStorage.setItem('user_detail', JSON.stringify(rest));
    }
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const getNFTHolder = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/nftholder/getusernft`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const res = await axios(config);

    if (res.status == 200) {
      dispatch({
        type: PROFILE_NFT,
        payload: res.data.nftbalance,
      });
    }
  } catch (error) {
    dispatch({
      type: PROFILE_NFT_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};
