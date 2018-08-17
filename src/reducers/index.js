import { combineReducers } from 'redux';
import userinfo from './userinfo';
import baseUrl from './baseUrl';

export default combineReducers({
  userinfo,
  baseUrl
});
