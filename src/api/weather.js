import http from '../utils/http';

export const weather = (params = {}) => {
  params = {
    appid: 13299141,
    appsecret: 'QAC4htNe',
    cityid: 101120301,
    version: 'v6'
  };
  return http.get('https://www.tianqiapi.com/api/', params);
};
