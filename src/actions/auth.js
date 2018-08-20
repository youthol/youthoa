export const updateLogin = username => ({
  type: 'UPDATE_LOGIN',
  isAuth: true,
  username
});

export const updateLogout = () => ({
  type: 'UPDATE_LOGOUT',
  isAuth: false,
  username: null
});
