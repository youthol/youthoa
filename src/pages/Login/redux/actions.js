import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setUserInfo = token => (dispatch, getState) => {
  if (!token) return;
  const state = getState();
  const BASE_API = state.globalData.BASE_API;
  axios
    .get(`${BASE_API}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      dispatch({
        type: actionTypes.SET_USER_INFO,
        data: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteUserInfo = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.DEL_USER_INFO
  });
};
