import http from '@/utils/http';

/**
 * 获取当天签到人数
 * @param {*} params
 */
export const getRecords = (params = {}) => {
  return http.get('/signin', params);
};

/**
 * 提交签到
 * @param {*} data
 */
export const postSignin = (data = {}) => {
  return http.post('/signin', data);
};
