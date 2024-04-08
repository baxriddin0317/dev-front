/* eslint-disable radix */
import axios from 'axios';
import {
  BUY_SUBSCRIPTION,
  BUY_SUBSCRIPTION_ERROR,
  GET_SUBSCRIPTION_HISTORY_ERROR,
  GET_SUBSCRIPTION_HISTORY,
  GET_ALL_SUBSCRIPTION_ERROR,
  GET_ALL_SUBSCRIPTION,
  GET_MEOX_VALUE,
  GET_MEOX_VALUE_ERROR,
  GET_ACTIVE_SUBSCRIPTION,
} from '../types';
import { notifyError } from '../../utils/toast';
import moment from 'moment';
import { handleLogout } from './authAction';

export const createJMOrder = async (subId) => {
  try {
    const token = localStorage.getItem('token_key');

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/subscription/create`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        subId,
        meox: false,
      }),
    };

    const res = await axios(config);
    const { data } = res;

    return data.paymentUrl;
  } catch (error) {
    return '/';
  }
};

export const getMeoxValue = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/subscription/get-meox-price-in-usdt?USDamount=${e}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: GET_MEOX_VALUE,
        payload: data.MEOX,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_MEOX_VALUE_ERROR,
      payload: error.response.data.message,
    });
    notifyError(error.response.data.message);
  }
};

export const createMeoxOrder = async (subId) => {
  try {
    const token = localStorage.getItem('token_key');

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/subscription/create`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        subId,
        meox: true,
      }),
    };

    const res = await axios(config);
    const { data } = res;

    return data.paymentUrl;
  } catch (error) {
    return '/';
  }
};

export const getAllSubscriptions = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/subscription/get-all`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: GET_ALL_SUBSCRIPTION,
        payload: data.reverse(),
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_SUBSCRIPTION_ERROR,
      payload: error.response.data.message,
    });
    notifyError(error.response.data.message);
  }
};

export const buySubscription = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const {
      active,
      hash,
      orderId,
      amount,
      paymentStatus,
      paymentUrl,
      paymentResponse,
      paymentTime,
      amountMeox,
      subID,
    } = e;
    const subData = JSON.stringify({
      active,
      hash,
      orderid: orderId,
      amount,
      payment_status: paymentStatus,
      payment_url: paymentUrl,
      amount_meox: amountMeox,
      payment_response: paymentResponse,
      payment_time: paymentTime,
      subscription_id: subID,
    });
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/subscription/store-user-subscription-history`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: subData,
    };

    const res = await axios(config);
    // const { data, status } = res;
    const { status } = res;

    // console.log(data);

    if (status === 200) {
      dispatch({
        type: BUY_SUBSCRIPTION,
      });
    }
  } catch (error) {
    dispatch({
      type: BUY_SUBSCRIPTION_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

const getSubscriptionName = async (id) => {
  const token = localStorage.getItem('token_key');

  const config = {
    method: 'get',
    url: `${process.env.REACT_APP_API_BASE_URL}/subscription/fetch-one/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const res = await axios(config);
  const { name } = res.data;
  return name;
};

export const getActiveSubscriptions = () => async (dispatch) => {
  const token = localStorage.getItem('token_key');
  try {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/subscription/get-user-active-subscriptions`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const res = await axios(config);
    const { data, status } = res;
    if (status === 200) {
      dispatch({
        type: GET_ACTIVE_SUBSCRIPTION,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: BUY_SUBSCRIPTION_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

const subscriptionPeriod = async (id) => {
  const token = localStorage.getItem('token_key');

  const config = {
    method: 'get',
    url: `${process.env.REACT_APP_API_BASE_URL}/subscription/fetch-one/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const res = await axios(config);
  const { period } = res.data;
  return period;
};

export const getSubscriptionHistory = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/subscription/get-user-subscriptions`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      if (data.length > 0) {
        const activeSubscription = [];
        data.map(async (sub) => {
          if (sub.payment_status === true) {
            const Name = await getSubscriptionName(sub.subscription_id);
            const Period = await subscriptionPeriod(sub.subscription_id);
            const eventdate = moment(sub.payment_time);
            const todaysdate = moment().add(-`${parseInt(Period)}`, 'days');
            const daysLeft = eventdate.diff(todaysdate, 'days');
            activeSubscription.push({
              name: Name,
              id: sub.subscription_id,
              daysLeft,
            });
            localStorage.setItem(
              'subscription',
              JSON.stringify(activeSubscription)
            );
          }
        });
      }

      // dispatch({
      //   type: GET_ACTIVE_SUBSCRIPTION,
      //   payload: activeSubscription,
      // });
      dispatch({
        type: GET_SUBSCRIPTION_HISTORY,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SUBSCRIPTION_HISTORY_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const updateSubscription = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const subData = JSON.stringify({
      _id: e.id,
      payment_status: e.status,
      payment_response: JSON.stringify(e.response),
      payment_time: e.time,
      amount_meox: e.amountMeox,
    });

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/subscription/update-user-active-subscription`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: subData,
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      // window.location.href =
      //   'https://metronix-trading.club/settings/subscription-history';
      dispatch({
        type: GET_SUBSCRIPTION_HISTORY,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SUBSCRIPTION_HISTORY_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
      return;
    }
    notifyError(error.response.data.message);
  }
};
