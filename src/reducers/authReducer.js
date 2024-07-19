import { LOGIN, LOGOUT, REGISTER, ADD_USER, UPDATE_PROFILE } from '../actions';

const initialState = {
  isAuthenticated: false,
  user: null,
  userList: [],
};

const userListReducer = (state = initialState.userList, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
