import * as actionTypes from './actionTypes';

export const setUserInfo = data => (dispatch, getState) => {
  if (!data) return;
  dispatch({
    type: actionTypes.SET_USER_INFO,
    data: data.data
  });
};

export const deleteUserInfo = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.DEL_USER_INFO
  });
};
