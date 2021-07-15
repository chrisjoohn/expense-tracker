import * as actionTypes from "store/constants/auth";

export const LoginRequest = (payload) => ({
  type: actionTypes.LOGIN_REQUEST,
  payload,
});

export const LoginSuccess = (payload) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload,
});

export const RegisterRequest = (payload) => ({
  type: actionTypes.REGISTER_REQUEST,
  payload,
});

export const RegisterSuccess = (payload) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload,
});
