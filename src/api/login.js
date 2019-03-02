import http from '@/utils/http';

export const postLogin = (data = {}) => {
  return http.post('/login', data);
};

export const getUserInfo = (params = {}) => {
  return http.get('/user', params);
};
