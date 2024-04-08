/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_SETTINGS,
  FETCH_SETTINGS_ERROR,
  FETCH_STATUS_SETTINGS,
  FETCH_HISTORY_SETTINGS,
  FETCH_ERROR_SETTINGS,
  FETCH_THEME_MODE_SETTINGS,
  FETCH_CREATE_BOT_SETTINGS,
  FETCH_ALL_SETTING,
} from '../types';

const initialState = {
  botListSettings: [],
  botStatusSettings: [],
  botHistorySettings: [],
  botErrorSettings: [],
  themeMode: '',
  botSettings: {},
  success: false,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SETTINGS:
      return {
        ...state,
        botListSettings: action.payload,
        success: true,
        loading: false,
      };
    case FETCH_STATUS_SETTINGS:
      return {
        ...state,
        botStatusSettings: action.payload,
        success: true,
        loading: false,
      };
    case FETCH_HISTORY_SETTINGS:
      return {
        ...state,
        botHistorySettings: action.payload,
        success: true,
        loading: false,
      };

    case FETCH_ERROR_SETTINGS:
      return {
        ...state,
        botErrorSettings: action.payload,
        success: true,
        loading: false,
      };

    case FETCH_THEME_MODE_SETTINGS:
      return {
        ...state,
        themeMode: action.payload,
        success: true,
        loading: false,
      };
    case FETCH_CREATE_BOT_SETTINGS:
      return {
        ...state,
        botSettings: action.payload,
        success: true,
        loading: false,
      };
    case FETCH_ALL_SETTING:
      return {
        ...state,
        botErrorSettings: action.payload?.bot_error_setting,
        botHistorySettings: action.payload?.bot_history_setting,
        botListSettings: action.payload?.bot_list_setting,
        botStatusSettings: action.payload?.bot_status_setting,
        botSettings: action.payload?.create_bot_setting,
        themeMode: action.payload?.theme_mode,
        success: true,
        loading: false,
      };

    case FETCH_SETTINGS_ERROR:
      return {
        ...state,
        success: false,
        loading: true,
      };

    default:
      return state;
  }
}
