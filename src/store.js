import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './reducers/authReducer';
import { thunk } from 'redux-thunk';
import userListReducer from './reducers/authReducer'; 
import themeReducer from './reducers/themeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  userList: userListReducer, 
  theme: themeReducer,
});

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
