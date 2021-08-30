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

function* ActionWatcher() {
  yield takeLatest(actionTypes.GET_ALL_EXPENSES_REQUEST, GetAllExpensesFlow);
  yield takeLatest(actionTypes.CREATE_EXPENSE_REQUEST, CreateExpenseFlow);
}

function* Watcher() {
  yield all([ActionWatcher()]);
}

export default Watcher;
