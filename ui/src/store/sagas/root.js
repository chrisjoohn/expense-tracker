import { all } from "redux-saga/effects";

import AuthSaga from "./auth";

function* RootSaga() {
  yield all([AuthSaga()]);
}

export default RootSaga;
