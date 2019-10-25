import http from '@/utils/http';

export const getBirthday = (params = {}) => {
  return http.get('/birthday', params);
};
