import { combineReducers } from 'redux';
import analytics from './analytics/reducer.analytics';
import auction from './auction/reducer.auction';
import auctionHouses from './auctionHouse/reducer.auctionHouse';
import auctionPlayConsumed from './auctionPlayConsumed/reducer.auctionPlayConsumed';
import authUser from './auth/reducer';
import authentication from './authentication/reducer.authentication';
import chatApp from './chat/reducer';
import currency from './currency/reducer.currency';
import globalAnalytics from './globalAnalytics/reducer.globalAnalytics';
import menu from './menu/reducer';
import product from './product/reducer.product';
import refferal from './referral/reducer.referral';
import revenue from './revenue/reducer.revenue';
import settings from './settings/reducer';
import surveyDetailApp from './surveyDetail/reducer';
import surveyListApp from './surveyList/reducer';
import termsAndCondition from './termsAndCondition/reducer.termsAndCondition';
import todoApp from './todo/reducer';
import user from './user/reducers';
import userBlock from './user/userBlock/reducer.userBlock';
import notebook from './notebook/reducer.notebook';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  todoApp,
  chatApp,
  surveyListApp,
  surveyDetailApp,
  user,
  product,
  authentication,
  auction,
  auctionHouses,
  termsAndCondition,
  refferal,
  analytics,
  globalAnalytics,
  currency,
  userBlock,
  auctionPlayConsumed,
  revenue,
  notebook,
});

export default reducers;
