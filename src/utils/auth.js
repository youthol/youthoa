import moment from 'moment';
import store from '@/store';

const checkLogin = () => {
  const { currentUser } = store.getState();
  const { userinfo, roles, permissions } = currentUser;
  const { token, expires_at } = sessionStorage;

  if (token && moment().isBefore(expires_at)) {
    // TODO: token存在且有效
    if (userinfo && roles && permissions) {
      // TODO: 用户储存在本地，不需要操作
    } else {
      // TODO: 用户没存在本地，需要拿token请求
    }
  } else if (token && moment().isAfter(expires_at)) {
    // TODO: token存在但无效，跳转登录页
  } else {
    // TODO: token不存在
  }
};

/**
 * @description 检查用户是否有相应权限
 * @param {*} perms Array
 * @returns
 */
const checkPermission = perms => {
  let { currentUser } = store.getState();
  let { permissions } = currentUser;
  if (!perms || !permissions) return false;

  let hasPermission = false;
  for (let i in perms) {
    if (permissions.some(item => item.name === perms[i])) {
      hasPermission = true;
      break;
    }
  }
  return hasPermission;
};

export { checkLogin, checkPermission };
