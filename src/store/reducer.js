// import * as actionTypes from './actionTypes';

const urls = {
  serve: 'http://127.0.0.1:8000/api/oa',
  localhost: 'http://localhost:5000/api'
};

const initialState = {
  BASE_API: urls.serve
};

export default (state = initialState, actions) => {
  // 此处为什么使用 switch ? 
  switch (actions.type) {
    default:
      return state;
  }
};
