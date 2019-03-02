import http from '@/utils/http';

export const getWorkloads = (params = {}) => {
  return http.get('/workloads', params);
};

export const postWorkload = (data = {}) => {
  return http.post('/workload', data);
};

export const putWorkload = (id, data = {}) => {
  return http.put(`/workload/${id}`, data);
};

export const deleteWorkload = (id, params = {}) => {
  return http.delete(`/workload/${id}`, params);
};
