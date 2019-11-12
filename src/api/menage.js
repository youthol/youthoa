import http from '@/utils/http';

export const getHygiene = (params = {}) => {
  return http.get('/hygiene/weeks', params);
};

export const deleteHygiene = (params = {}) => {
  return http.delete('/hygiene/weeks', params);
};

export const importPhoneBookUrl = 'https://youthapi.sdut.edu.cn/api/oa/phonebook/import';
export const importHygieneUrl = 'https://youthapi.sdut.edu.cn/api/oa/hygiene/import';
