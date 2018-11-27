const initialState = {
  userinfo: null,
  roles: null,
  permissions: null
};

const userinfo = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USERINFO':
      return Object.assign({}, initialState, action.data);
    case 'DELETE_USERINFO':
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
