import * as actionTypes from './actionTypes';

const initialState = {
  userinfo: null,
  roles: null,
  permissions: null
};

const userinfo = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return Object.assign({}, initialState, action.data);
    case actionTypes.DEL_USER_INFO:
      return {
        userinfo: null,
        roles: null,
        permissions: null
      };
    default:
      return state;
  }
};

export default userinfo;
