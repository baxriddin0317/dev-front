import { combineReducers } from 'redux';
import authReducer from './authReducer';
import botReducer from './createBotReducer';
import botStatusReducer from './botStatusReducer';
import botHistoryReducer from './botHistoryReducer';
import fetchKeysReducer from './listKeysReducer';
import userSettingsReducer from './userSettingsReducer';
import generateBuyLinkReducer from './generateBuyLinkReducer';
import subscriptionReducer from './subscriptionReducer';
import bidErrorReducer from './bidErrorReducer';
import securityReducer from './securityReducer';
import affiliateReducer from './affiliateReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  createBot: botReducer,
  botStatus: botStatusReducer,
  botHistory: botHistoryReducer,
  listKeys: fetchKeysReducer,
  settings: userSettingsReducer,
  buyData: generateBuyLinkReducer,
  subscriptionData: subscriptionReducer,
  errorBids: bidErrorReducer,
  security: securityReducer,
  affiliate: affiliateReducer,
  user: userReducer,
});
