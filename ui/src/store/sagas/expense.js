import { call, takeLatest, all, put } from "redux-saga/effects";

import * as actionTypes from "../constants/expense";
import * as ExpenseServices from "services/ExpenseServices";
import * as actionCreators from "../actionCreators/expense";

function* GetAllExpensesFlow(action) {
  const { dateTo, dateFrom } = action.payload || {};
  try {
    const expenses = yield call(ExpenseServices.GetAllExpensesService, {
      dateTo,
      dateFrom,
    });

    yield put(actionCreators.GetAllExpensesSuccess(expenses));
  } catch (err) {}
}

function* ActionWatcher() {
  yield takeLatest(actionTypes.GET_ALL_EXPENSES_REQUEST, GetAllExpensesFlow);
}

function* Watcher() {
  yield all([ActionWatcher()]);
}

export default Watcher;
