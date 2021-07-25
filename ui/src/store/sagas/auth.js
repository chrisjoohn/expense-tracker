import { call, takeLatest, all, put } from "redux-saga/effects";

import { setAuthHeaderToken } from "services";
import * as AuthService from "services/AuthServices";
import * as actionTypes from "store/constants/auth";
import * as actionCreators from "store/actionCreators/auth";

function* LoginFlow(action) {
  const { resolve, reject, data } = action.payload;

  try {
    const { token } = yield call(AuthService.LoginService, data);
    localStorage.setItem("auth_token", token);
    setAuthHeaderToken();

    resolve();
    yield put(
      actionCreators.GetUserDetailRequest({
        resolve: () => {},
        reject: () => {},
      })
    );
  } catch (err) {
    reject(err);
  }
}

function* GetUserDetailsFlow(action) {
  const { resolve, reject } = action.payload;

  try {
    let userDetails = yield call(AuthService.MeService);
    yield put(actionCreators.GetUserDetailSuccess(userDetails));

    resolve();
  } catch (err) {
    reject(err);
  }
}

function* RegisterFlow(action) {
  const { resolve, reject, data } = action.payload;
  try {
    let userDetails = yield call(AuthService.RegisterService, data);
    const { email } = userDetails;

    // set user email to localStorage to be shown on the verify email page
    localStorage.setItem("toVerifyEmail", email);
    resolve();
  } catch (err) {
    reject(err);
  }
}

function* ActionWatcher() {
  yield takeLatest(actionTypes.LOGIN_REQUEST, LoginFlow);
  yield takeLatest(actionTypes.GET_USER_DETAILS_REQUEST, GetUserDetailsFlow);
  yield takeLatest(actionTypes.REGISTER_REQUEST, RegisterFlow);
}

function* Watcher() {
  yield all([ActionWatcher()]);
}

export default Watcher;
