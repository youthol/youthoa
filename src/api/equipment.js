import http from '@/utils/http';

export const getEquipments = (params = {}) => {
  return http.get('/equipments', params);
};

export const postEquipment = (data = {}) => {
  return http.post('/equipment', data);
};

export const putEquipment = (id, data = {}) => {
  return http.put(`/equipment/${id}`, data);
};

export const deleteEquipment = (id, data = {}) => {
  return http.delete(`/equipment/${id}`, data);
};
