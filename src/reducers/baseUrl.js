const initialState = {
  server: 'https://api.youthol.cn/',
  localhost: 'http://localhost:5000/api/'
};

const baseUrl = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default baseUrl;
