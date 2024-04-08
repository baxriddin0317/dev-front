import axios from 'axios';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_2FA,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_SIGNUP,
  AUTH_SIGNUP_ERROR,
} from '../types';
import { notifyError, notifySuccess } from '../../utils/toast';
import { addBotSettings } from './userSettingsAction';

export const handleLogin = (e) => async (dispatch) => {
  const { email, password, code } = e;

  try {
    const data = JSON.stringify({
      email,
      password,
      code,
    });

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/admin/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      const { token, auth2fa } = res.data;

      if (auth2fa) {
        dispatch({
          type: AUTH_LOGIN_2FA,
          payload: res,
        });
      } else {
        localStorage.setItem('user_detail', JSON.stringify(res.data));
        localStorage.setItem('token_key', token);
        notifySuccess('Login Success!');
        dispatch({
          type: AUTH_LOGIN,
          payload: res,
        });
      }
    } else {
      dispatch({
        type: AUTH_ERROR,
      });
      notifyError(res.message);
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.message,
    });
    notifyError(error.response.data.message);
  }
};
export const handleLogout = () => async (dispatch) => {
  localStorage.removeItem('user_detail');
  localStorage.removeItem('token_key');
  // location.reload();
  dispatch({
    type: AUTH_LOGOUT,
    payload: '',
  });
};

export const handleSignup = (e) => async (dispatch) => {
  try {
    const { email, password, name, refcode, username } = e;
    const data = JSON.stringify({
      username,
      name,
      email,
      password,
      refcode,
    });

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/admin/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    const res = await axios(config);

    if (res.status === 200) {
      const { token } = res.data;
      localStorage.setItem('user_detail', JSON.stringify(res.data));
      localStorage.setItem('token_key', token);
      dispatch(addBotSettings());
      notifySuccess('Registered Successfully!');
      dispatch({
        type: AUTH_SIGNUP,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: AUTH_SIGNUP_ERROR,
      payload: error,
    });
    notifyError(error.response.data.message);
  }
};
