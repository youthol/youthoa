//import * as actionTypes from './actionTypes';

const urls = {
  serve: 'https://youthapi.sdut.edu.cn/api/oa',
  localhost: 'http://localhost:5000/api'
};

const initialState = {
  BASE_API: urls.serve
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    default:
      return state;
  }
};
