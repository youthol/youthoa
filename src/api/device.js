import http from '@/utils/http';

export const getEquipments = (params = {}) => {
  return http.get('/equipments', params);
};

export const getRecords = (params = {}) => {
  return http.get('/devices', params);
};

export const postRecord = (data = {}) => {
  return http.post('/device', data);
};

export const putRecord = (id, data ={}) => {
   return http.put(`/device/${id}`, data)
}