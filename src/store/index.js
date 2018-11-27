import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import globalData from './reducer';
import currentUser from '@/pages/Login/redux/reducer';

const rootReducer = combineReducers({
  globalData,
  currentUser
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
