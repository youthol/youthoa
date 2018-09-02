const initialState = {
  server: 'https://api.youthol.cn/api/oa',
  localhost: 'http://192.168.1.104/youthAPI/public/api/oa',
};

export default (state = initialState.server) => state;
