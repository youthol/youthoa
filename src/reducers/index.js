import { combineReducers } from "redux";
import baseUrl from "./baseUrl";
import userinfo from "./userinfo";

export default combineReducers({
  baseUrl,
  userinfo
});
