import http from '@/utils/http';

export const getRecords = (params = {}) => {
  return http.get('/phonebooks', params);
};

export const putRecord = (id, data = {}) => {
  return http.put(`/phonebook/${id}`, data);
};

export const deleteRecord = (id, params = {}) => {
  return http.delete(`/phonebook/${id}`, params);
};
