import * as actionTypes from "../constants/fixedExpense";

export const GetPayabales = (payload) => ({
  type: actionTypes.GET_PAYABLES,
  payload,
});

export const SetPayables = (payload) => ({
  type: actionTypes.SET_PAYABLES,
  payload,
});
