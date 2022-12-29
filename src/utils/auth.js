import moment from 'moment';
import store from '@/store';

/**
 * @description 检查是否登录
 * @returns 1正常; 2过期; 3未登录
 */
// 常量
// loggedin 正常   (登录)
// overdue 过期    (登录过期)
// notloggedin        (未登录)

export const checkLogin = () => {
  const { token, expires_at } = sessionStorage;
  if (token && moment().isBefore(expires_at)) {
    return 1;
  } else if (token && moment().isAfter(expires_at)) {
    return 2;
  } else {
    return 3;
  }
};

/**
 * @description 检查是否有相应权限
 * @param {*} perms 权限数组
 * @returns true:有权限; false:无权限
 */
export const checkPermission = perms => {
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

// export { checkLogin, checkPermission };
