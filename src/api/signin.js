import http from '@/utils/http';

export const getRecords = (params = {}) => {
  return http.get('/signin', params);
};

export const postSignin = (data = {}) => {
  return http.post('/signin', data);
};
