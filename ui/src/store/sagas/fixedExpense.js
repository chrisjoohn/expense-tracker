import { call, takeLatest, all, put } from "redux-saga/effects";

import * as actionTypes from "../constants/fixedExpense";
import * as services from "services/FixedExpenseServices";
import * as actionCreators from "../actionCreators/fixedExpense";

function* GetPayablesFlow(action) {
  try {
    const payables = yield call(services.GetPayables);
    yield put(actionCreators.SetPayables(payables));
  } catch (err) {
    console.log(err);
    // Add toast here
  }
}

function* ActionWatcher() {
  yield takeLatest(actionTypes.GET_PAYABLES, GetPayablesFlow);
}

function* Watcher() {
  yield all([ActionWatcher()]);
}

export default Watcher;
