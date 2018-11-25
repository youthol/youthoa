import { combineReducers } from "redux";
import baseUrl from "./baseUrl";
import auth from "./auth";
import userinfo from "./userinfo";

export default combineReducers({
  baseUrl,
  auth,
  userinfo
});
