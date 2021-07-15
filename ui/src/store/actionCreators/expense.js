import * as actionTypes from "store/constants/expense";

export const CreateExpenseRequest = (payload) => ({
  type: actionTypes.CREATE_EXPENSE_REQUEST,
  payload,
});

export const CreateExpenseSuccess = (payload) => ({
  type: actionTypes.CREATE_EXPENSE_SUCCESS,
  payload,
});

export const GetExpenseRequest = (payload) => ({
  type: actionTypes.GET_EXPENSE_REQUEST,
  payload,
});

export const GetExpenseSuccess = (payload) => ({
  type: actionTypes.GET_EXPENSE_SUCCESS,
  payload,
});

export const GetAllExpensesRequest = (payload) => ({
  type: actionTypes.GET_ALL_EXPENSES_REQUEST,
  payload,
});

export const GetAllExpensesSuccess = (payload) => ({
  type: actionTypes.GET_ALL_EXPENSES_SUCCESS,
  payload,
});

export const UpdateExpenseRequest = (payload) => ({
  type: actionTypes.UPDATE_EXPENSE_REQUEST,
  payload,
});

export const UpdateExpenseSuccess = (payload) => ({
  type: actionTypes.UPDATE_EXPENSE_SUCCESS,
  payload,
});

export const DeleteExpenseRequest = (payload) => ({
  type: actionTypes.DELETE_EXPENSE_REQUEST,
  payload,
});

export const DeleteExpenseSuccess = (payload) => ({
  type: actionTypes.DELETE_EXPENSE_SUCCESS,
  payload,
});
