import axios from "axios";
import { put, call, take, fork } from "redux-saga/effects";
import * as constants from "./../constants";
import { logInSuccess, logInFailure, userFromJwt, modalClose, logOut } from "./../actions/loginActions";
import { loadUserData } from "./../actions/userProfile";
import { loadRecipes, recipesLogOut } from "../actions/recipes";
import setAuthToken from "../../components/common/setAuthToken";
import isExpired from "../../components/common/isExpired/isExpired";
import jwt from "jwt-decode";

export function* fetchUserLogin(user) {
  try {
    const res = yield call(axios.post, "/api/customers/login", user);
    if (res.data.success) {
      yield call(setAuthToken, res.data.token);
    }
    yield put(logInSuccess());
    yield put(userFromJwt(jwt(res.data.token)));
    yield put(modalClose());
    yield put(loadUserData());
    yield put(loadRecipes());
  } catch (error) {
    yield put(logInFailure(error));
  }
}

export function* userLogInFlow() {
  while (true) {
    const { payload } = yield take(constants.LOG_IN_REQUEST);
    yield call(fetchUserLogin, payload);
  }
}

export function* watchUserLogin() {
  yield fork(userLogInFlow)
}

export function* userLogOutFlow() {
  while (true) {
    yield take(constants.LOG_OUT);
    yield call(setAuthToken, null);
    yield put(recipesLogOut());
  }
}

export function* watchUserLogOut() {
  yield fork(userLogOutFlow)
}

export function* userLogInOrLogOutFlow() {
  while (true) {
    yield take(constants.LOG_IN_OR_LOG_OUT_CHECK);
    const token = localStorage.getItem("authTokenCookbook");
    if (token) {
      const isExpiredToken = isExpired(jwt(token));
      if (isExpiredToken) {
        yield call(setAuthToken, token);
        yield put(userFromJwt(jwt(token)));
        yield put(loadUserData());
        yield put(loadRecipes());
      } else {
        yield put(logOut());
      }
    }
  }
}

export function* watchUserLogInOrLogOut() {
  yield fork(userLogInOrLogOutFlow)
}

