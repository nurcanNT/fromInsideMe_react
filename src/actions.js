import { type } from "@testing-library/user-event/dist/type";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const CREATE = 'CREATE';

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
})
