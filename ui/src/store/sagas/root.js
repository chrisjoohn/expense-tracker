import { all } from "redux-saga/effects";

import AuthSaga from "./auth";
import ExpenseSaga from "./expense";
import FixedExpenseSaga from "./fixedExpense";

function* RootSaga() {
  yield all([AuthSaga(), ExpenseSaga(), FixedExpenseSaga()]);
}

export default RootSaga;
