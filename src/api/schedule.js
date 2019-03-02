import http from '@/utils/http';

export const getSchedules = (params = {}) => {
  return http.get('/schedules', params);
};

export const postSchedule = (data = {}) => {
  return http.post('/schedule', data);
};

export const putSchedule = (id, data = {}) => {
  return http.put(`/schedule/${id}`, data);
};
