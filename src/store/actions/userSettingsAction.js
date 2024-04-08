import axios from 'axios';
import {
  // FETCH_SETTINGS,
  FETCH_SETTINGS_ERROR,
  UPDATE_LIST_SETTINGS,
  UPDATE_LIST_SETTINGS_ERROR,
  FETCH_STATUS_SETTINGS,
  FETCH_STATUS_SETTINGS_ERROR,
  FETCH_HISTORY_SETTINGS,
  FETCH_HISTORY_SETTINGS_ERROR,
  FETCH_ERROR_SETTINGS,
  FETCH_ERROR_SETTINGS_ERROR,
  FETCH_THEME_MODE_SETTINGS,
  FETCH_THEME_MODE_SETTINGS_ERROR,
  FETCH_CREATE_BOT_SETTINGS,
  FETCH_CREATE_BOT_SETTINGS_ERROR,
  ADD_SETTINGS_ERROR,
  FETCH_ALL_SETTING,
  AUTH_LOGOUT,
} from '../types';
import { notifyError, notifySuccess } from '../../utils/toast';

export const addBotSettings = (e) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const newconfig = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_setting_add`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(newconfig);
    const { status } = res;

    if (status === 200 && e) {
      notifySuccess('Bot Settings Reset Successfully');
    }
  } catch (error) {
    dispatch({
      type: ADD_SETTINGS_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      localStorage.clear();
      dispatch({
        type: AUTH_LOGOUT,
        payload: '',
      });
      return;
    }
    notifyError(error.response.data.message);
  }
};

// export const getBotListSettings = () => async (dispatch) => {
//   try {
//     const token = localStorage.getItem('token_key');
//     const config = {
//       method: 'get',
//       url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_bot_list_setting`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const res = await axios(config);
//     const { data, status } = res;

//     if (data.length === 0) {
//       dispatch(addBotSettings);
//     }

//     if (status === 200) {
//       dispatch({
//         type: FETCH_SETTINGS,
//         payload: data[0].bot_list_setting,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: FETCH_SETTINGS_ERROR,
//       payload: error.response.data.message,
//     });
//     if (error.response.data.message === 'Invalid token') {
//       localStorage.clear();
//       dispatch({
//         type: AUTH_LOGOUT,
//         payload: '',
//       });
//       return;
//     }
//     notifyError(error.response.data.message);
//   }
// };

export const getBotStatusSettings = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_bot_status_setting`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (data.length === 0) {
      dispatch(addBotSettings);
    }
    if (status === 200) {
      dispatch({
        type: FETCH_STATUS_SETTINGS,
        payload: data[0].bot_status_setting,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_STATUS_SETTINGS_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      localStorage.clear();
      dispatch({
        type: AUTH_LOGOUT,
        payload: '',
      });
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const updateBotListSettings = (e) => async (dispatch) => {
  try {
    const listData = {
      bot_list_setting: e,
    };

    const token = localStorage.getItem('token_key');
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_bot_list_setting_update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: listData,
    };

    const res = await axios(config);
    const { status } = res;

    if (status === 200) {
      // dispatch(getBotListSettings());
      dispatch(getAllBotSettings());
      // dispatch({
      //   type: UPDATE_LIST_SETTINGS,
      // });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_LIST_SETTINGS_ERROR,
    });
    if (error.response.data.message === 'Invalid token') {
      localStorage.clear();
      dispatch({
        type: AUTH_LOGOUT,
        payload: '',
      });
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const updateBotStatusSettings = (e) => async (dispatch) => {
  try {
    const listData = {
      bot_status_setting: e,
    };

    const token = localStorage.getItem('token_key');
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_bot_status_setting_update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: listData,
    };

    const res = await axios(config);
    const { status } = res;

    if (status === 200) {
      dispatch(getBotStatusSettings());
      dispatch({
        type: UPDATE_LIST_SETTINGS,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_LIST_SETTINGS_ERROR,
    });
    if (error.response.data.message === 'Invalid token') {
      localStorage.clear();
      dispatch({
        type: AUTH_LOGOUT,
        payload: '',
      });
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const getBotHistorySettings = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_bot_history_setting`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (data.length === 0) {
      dispatch(addBotSettings);
    }

    if (status === 200) {
      dispatch({
        type: FETCH_HISTORY_SETTINGS,
        payload: data[0].bot_history_setting,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_HISTORY_SETTINGS_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      localStorage.clear();
      dispatch({
        type: AUTH_LOGOUT,
        payload: '',
      });
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const updateBotHistorySettings = (e) => async (dispatch) => {
  try {
    const listData = {
      bot_history_setting: e,
    };

    const token = localStorage.getItem('token_key');
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_bot_history_setting_update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: listData,
    };

    const res = await axios(config);
    const { status } = res;

    if (status === 200) {
      dispatch(getBotHistorySettings());
      dispatch({
        type: UPDATE_LIST_SETTINGS,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_LIST_SETTINGS_ERROR,
    });
    if (error.response.data.message === 'Invalid token') {
      localStorage.clear();
      dispatch({
        type: AUTH_LOGOUT,
        payload: '',
      });
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const getBotErrorSettings = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_bot_error_setting`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (data.length === 0) {
      dispatch(addBotSettings);
    }

    if (status === 200) {
      dispatch({
        type: FETCH_ERROR_SETTINGS,
        payload: data[0].bot_error_setting,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_ERROR_SETTINGS_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      localStorage.clear();
      dispatch({
        type: AUTH_LOGOUT,
        payload: '',
      });
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const updateBotErrorSettings = (e) => async (dispatch) => {
  try {
    const listData = {
      bot_error_setting: e,
    };

    const token = localStorage.getItem('token_key');
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_bot_error_setting_update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: listData,
    };

    const res = await axios(config);
    const { status } = res;

    if (status === 200) {
      dispatch(getBotErrorSettings());
      dispatch({
        type: UPDATE_LIST_SETTINGS,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_LIST_SETTINGS_ERROR,
    });
    if (error.response.data.message === 'Invalid token') {
      localStorage.clear();
      dispatch({
        type: AUTH_LOGOUT,
        payload: '',
      });
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const getThemeModeSettings = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_theme_mode_setting`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (Object.keys(data[0]).length === 0) {
      const themeData = {
        theme_mode: 1,
      };
      const newconfig = {
        method: 'post',
        url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_theme_mode_setting_update`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: themeData,
      };

      await axios(newconfig);
    }

    if (status === 200) {
      dispatch({
        type: FETCH_THEME_MODE_SETTINGS,
        payload: data[0].theme_mode,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_THEME_MODE_SETTINGS_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      localStorage.clear();
      dispatch({
        type: AUTH_LOGOUT,
        payload: '',
      });
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const updateThemeModeSettings = (e) => async () => {
  try {
    const themeData = {
      theme_mode: e,
    };
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_theme_mode_setting_update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: themeData,
    };

    await axios(config);
  } catch (error) {}
};

export const getCreateBotSettings = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_create_bot_setting`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;

    if (status === 200) {
      dispatch({
        type: FETCH_CREATE_BOT_SETTINGS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_CREATE_BOT_SETTINGS_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      localStorage.clear();
      dispatch({
        type: AUTH_LOGOUT,
        payload: '',
      });
      return;
    }
    notifyError(error.response.data.message);
  }
};

export const updateCreateBotSettings = (e) => async () => {
  try {
    const themeData = {
      create_bot_setting: e,
    };
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_create_bot_setting_update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: themeData,
    };

    const res = await axios(config);
    if (res.status === 200) {
      notifySuccess('Bot Settings Updated Successfully');
    }
  } catch (error) {}
};

export const getAllBotSettings = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token_key');
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/usersettings/user_settings`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const { data, status } = res;
    localStorage.setItem('mode', data.theme_mode);
    // if (data.length === 0) {
    //   dispatch(addBotSettings);
    // }

    if (status === 200) {
      dispatch({
        type: FETCH_ALL_SETTING,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_SETTINGS_ERROR,
      payload: error.response.data.message,
    });
    if (error.response.data.message === 'Invalid token') {
      localStorage.clear();
      dispatch({
        type: AUTH_LOGOUT,
        payload: '',
      });
      return;
    }
    notifyError(error.response.data.message);
  }
};
