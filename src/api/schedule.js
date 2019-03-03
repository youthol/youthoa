import http from '@/utils/http';

export const getRecords = (params = {}) => {
  return http.get('/schedules', params);
};

export const postRecord = (data = {}) => {
  return http.post('/schedule', data);
};

export const putRecord = (id, data = {}) => {
  return http.put(`/schedule/${id}`, data);
};

export const deleteRecord = (id, data = {}) => {
  return http.delete(`/schedule/${id}`, data);
};
