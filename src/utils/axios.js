import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

const errorHandle = (response, status) => {
  try {
    const { errors } = response.data;
    if (errors) {
      for (let error in errors) {
        if (errors[error] instanceof Array) {
          errors[error].forEach(el => message.error(el));
        }
      }
    } else {
      message.error(response.data.message);
    }
  } catch (e) {
    console.error(e);
  }
};

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/oa',
  withCredentials: false,
  timeout: 3000
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
instance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

instance.interceptors.request.use(
  config => {
    const { token } = sessionStorage;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.method === 'post' || config.method === 'put') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    const { data } = response;
    return data;
  },
  error => {
    const { response } = error;
    if (response) {
      errorHandle(response, response.status);
      return Promise.reject(response);
    } else {
      console.error('连接到服务器失败');
    }
  }
);

export default instance;
