import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer
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
    persistedState
  );
  
  store.subscribe(() => saveToLocalStorage(store.getState()));
  
  export default store;