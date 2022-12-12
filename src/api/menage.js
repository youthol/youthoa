import http from '@/utils/http';

export const getHygiene = (params = {}) => {
  return http.get('/hygiene/weeks', params);
};

export const deleteHygiene = (params = {}) => {
  return http.delete('/hygiene/weeks', params);
};

export const importPhoneBookUrl = 'http://127.0.0.1:8000/api/oa/phonebook/import';
export const importHygieneUrl = 'http://127.0.0.1:8000/api/oa/hygiene/import';
