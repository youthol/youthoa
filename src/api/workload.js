import http from '@/utils/http';

export const getRecords = (params = {}) => {
  return http.get('/workloads', params);
};

export const postRecord = (data = {}) => {
  return http.post('/workload', data);
};

export const putRecord = (id, data = {}) => {
  return http.put(`/workload/${id}`, data);
};

export const deleteRecord = (id, params = {}) => {
  return http.delete(`/workload/${id}`, params);
};
