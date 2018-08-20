const initialState = {
  isAuth: false,
  username: null
};

const userinfo = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LOGIN':
      return {
        isAuth: action.isAuth,
        username: action.username
      };
    case 'UPDATE_LOGOUT':
      return {
        isAuth: action.isAuth,
        username: action.username
      };
    default:
      return state;
  }
};

export default userinfo;
