import { call, takeLatest, all, put } from "redux-saga/effects";

import * as actionTypes from "../constants/expense";
import * as services from "services/ExpenseServices";
import * as actionCreators from "../actionCreators/expense";

function* GetAllExpensesFlow(action) {
  const { dateTo, dateFrom } = action.payload || {};
  try {
    const expenses = yield call(services.GetAllExpensesService, {
      dateTo,
      dateFrom,
    });

    yield put(actionCreators.GetAllExpensesSuccess(expenses));
  } catch (err) {}
}

function* CreateExpenseFlow(action) {
  const { resolve, reject, data } = action.payload;

  try {
    let createdExpense = yield call(services.CreateExpenseService, data);
    yield put(actionCreators.CreateExpenseSuccess(createdExpense));
    resolve();
  } catch (err) {
    reject(err);
  }
}

function* UpdateExpenseFlow(action) {
  const { data, id } = action.payload;

  try {
    let updatedExpense = yield call(services.UpdateExpenseService, id, data);
    yield put(actionCreators.UpdateExpenseSuccess(updatedExpense));
  } catch (err) {
    alert("Something went wrong");
    yield put(actionCreators.UpdateExpenseFail({ id }));
  }
}

function* DeleteExpenseFlow(action) {
  const { id } = action.payload;
  try {
    let deletedExpense = yield call(services.DeleteExpenseService, id);
    yield put(actionCreators.DeleteExpenseSuccess(deletedExpense));
  } catch (err) {}
}

function* ActionWatcher() {
  yield takeLatest(actionTypes.GET_ALL_EXPENSES_REQUEST, GetAllExpensesFlow);
  yield takeLatest(actionTypes.CREATE_EXPENSE_REQUEST, CreateExpenseFlow);
  yield takeLatest(actionTypes.UPDATE_EXPENSE_REQUEST, UpdateExpenseFlow);
  yield takeLatest(actionTypes.DELETE_EXPENSE_REQUEST, DeleteExpenseFlow);
}

function* Watcher() {
  yield all([ActionWatcher()]);
}

export default Watcher;
