import actionTypes from './actionTypes';
import { getUserInfo } from '@/api/login';

export const setUserInfo = () => async (dispatch, getState) => {
  const { currentUser } = getState();
  const { userinfo, permissions } = currentUser;
  if (!userinfo || !permissions) {
    const rowData = await getUserInfo();
    dispatch({
      type: actionTypes.SET_USERINFO,
      data: rowData.data
    });
  }
};

export const deleteUserInfo = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.DELETE_USERINFO
  });
};
