import axios from 'axios';
import { GET_BUY_LINK, PAYMENT_CHECK, PAYMENT_CHECK_ERROR } from '../types';
import {
  buySubscription,
  updateSubscription,
  getMeoxValue,
} from './subscriptionAction';
import store from 'store/store';
import { handleLogout } from './authAction';

export const generateBuyLink = (e, subid, redirect) => async (dispatch) => {
  try {
    const linkData = JSON.stringify(e);

    const config = {
      method: 'post',
      url: 'https://api-pay.just.money/v1/checkout/newOrder',
      headers: {
        'Content-Type': 'application/json',
      },
      data: linkData,
    };
    const res = await axios(config);

    if (res.status === 201) {
      dispatch(getMeoxValue(e.totalAmount)).then(() => {
        const stateData = store.getState();

        if (stateData.subscriptionData.meoxValue) {
          dispatch(
            buySubscription({
              active: false,
              hash: res.data.paymentUrl.replace(
                'https://pay.just.money/pay?h=',
                ''
              ),
              orderId: e.orderId,
              amount: e.totalAmount,
              amountMeox: stateData.subscriptionData.meoxValue,
              paymentStatus: false,
              paymentUrl: res.data.paymentUrl,
              paymentResponse: null,
              paymentTime: new Date(),
              subID: subid,
            })
          ).then(() => {
            if (res.data.paymentUrl && redirect) {
              dispatch({
                type: GET_BUY_LINK,
                payload: res.data.paymentUrl,
              });
              window.location.href = res.data.paymentUrl;
            } else {
              dispatch({
                type: GET_BUY_LINK,
                payload: res.data.paymentUrl,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
    }
  }
};

export const getOrderDetails = (e, subid) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    // const data = JSON.stringify({
    //   hash: e,
    // });
    // const config = {
    //   method: 'get',
    //   url: `https://api-pay.just.money/v1/checkout/getOrderByHash/${e}`,
    //   headers: {
    //     'X-Requested-With': 'XMLHttpRequest',
    //   },
    // };
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/subscription/jm-order-by-hash?hash=${e}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await axios(config);

    if (res.data.data.status === 'COMPLETED') {
      dispatch(getMeoxValue(res.data.data.totalAmount)).then(() => {
        const stateData = store.getState();

        dispatch(
          updateSubscription({
            id: subid,
            status: true,
            response: res.data.data,
            time: new Date(),
            amountMeox: stateData.subscriptionData.meoxValue,
          })
        );
        dispatch({
          type: PAYMENT_CHECK,
          payload: true,
        });
      });
    }
  } catch (error) {
    dispatch({
      type: PAYMENT_CHECK_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
    }
  }
};

export const checkOrderStatus = (e, subid) => async (dispatch) => {
  try {
    const orderdata = JSON.stringify({
      _id: subid,
    });
    if (e && subid) {
      // const config = {
      //   method: 'get',
      //   url: `https://api-pay.just.money/v1/checkout/getStatusByHash/${e}`,
      //   headers: {
      //     'X-Requested-With': 'XMLHttpRequest',
      //   },
      // };
      const token = localStorage.getItem('token_key');
      // const hashData = JSON.stringify({
      //   hash: '94851ab3bf4a3eda769e20bb912e3cf9f7853502c992be3ab656b5cab7072f5b',
      // });
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_BASE_URL}/subscription/update-payment-status?_id=${subid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: orderdata,
      };

      const res = await axios(config);

      console.log(res);
    }
  } catch (error) {
    if (error.response.data.message === 'Invalid token') {
      dispatch(handleLogout());
    }
  }
};
