import actionTypes from './actionTypes';

const initialState = {
  userinfo: null,
  roles: null,
  permissions: null
};

const userinfo = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERINFO:
      return Object.assign({}, initialState, action.data);
    case actionTypes.DELETE_USERINFO:
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
