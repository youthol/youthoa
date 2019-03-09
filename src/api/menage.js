import http from '@/utils/http';

export const getHygiene = (params = {}) => {
  return http.get('/hugiene/weeks', params);
};
