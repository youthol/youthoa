import axios from 'axios';
import { message } from 'antd';
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
      try {
        const { errors } = err.response.data;
        if (errors) {
          for (let error in errors) {
            if (errors[error] instanceof Array) {
              errors[error].forEach(el => message.error(el));
            }
          }
        } else {
          message.error(err.response.data.message);
        }
      } catch (e) {
        console.error(e);
      }
    });
};

export const deleteUserInfo = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.DEL_USER_INFO
  });
};
