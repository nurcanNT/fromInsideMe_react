export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const CREATE = 'CREATE';
export const ADD_USER = 'ADD_USER';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

export const login = (user) => ({
  type: LOGIN,
  payload: user
});

export const logout = () => ({
  type: LOGOUT
});

export const register = (user) => ({
  type: REGISTER,
  payload: user
});

export const create = (email) => ({
    type: CREATE,
    payload: email
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

export const updateProfile = (profile) => ({
  type: UPDATE_PROFILE,
  payload: profile,
});

export const updateAccount = (myAccount) => ({
  type: UPDATE_ACCOUNT,
  payload: myAccount,
});
