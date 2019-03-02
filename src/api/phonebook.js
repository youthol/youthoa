import http from '@/utils/http';

export const getPhonebooks = (params = {}) => {
  return http.get('/phonebooks', params);
};

export const putPhonebook = (id, data = {}) => {
  return http.put(`/phonebook/${id}`, data);
};

export const deletePhonebook = (id, params = {}) => {
  return http.delete(`/phonebook/${id}`, params);
};
