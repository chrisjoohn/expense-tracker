import { all } from "redux-saga/effects";

import AuthSaga from "./auth";
import ExpenseSaga from "./expense";

function* RootSaga() {
  yield all([AuthSaga(), ExpenseSaga()]);
}

export default RootSaga;
