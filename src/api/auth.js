import http from '@/utils/http';

export const getUsers = (params = {}) => {
  return http.get('/users', params);
};

export const getUserById = (id, params = {}) => {
  return http.get(`/user/${id}`, params);
};

export const putUser = (id, data = {}) => {
  return http.put(`/user/${id}`, data);
};

export const deleteUser = (id, params = {}) => {
  return http.delete(`/user/${id}`, params);
};

export const getRoles = (params = {}) => {
  return http.get('/roles', params);
};

export const getRoleById = (id, params = {}) => {
  return http.get(`/role/${id}`, params);
};

export const putRole = (id, data = {}) => {
  return http.put(`/role/${id}`, data);
};

export const getPerms = (params = {}) => {
  return http.get('/permissions', params);
};

export const getPermById = (id, params = {}) => {
  return http.get(`/permission/${id}`, params);
};

export const putPerm = (id, data = {}) => {
  return http.put(`/permission/${id}`, data);
};

export const ImportUserTableUrl = 'http://127.0.0.1:8000/api/oa/user/import';
