const initialState = {
  server: 'https://api.youthol.cn/api',
  localhost: 'http://localhost:5000/api'
};

export default (state = initialState.localhost) => state;
