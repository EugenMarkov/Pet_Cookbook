import axios from "axios";
import { put, call, take, fork } from "redux-saga/effects";
import * as constants from "./../constants";
import { logInSuccess, logInFailure, userFromJwt, modalClose } from "./../actions/loginActions";
import { loadUserData } from "./../actions/userProfile";
import { loadRecipes, recipesLogOut} from "../actions/recipes";
import setAuthToken from "../../components/common/setAuthToken";
import jwt from "jwt-decode";


export function* fetchUserLogin(user) {
  try {
    const res = yield call(axios.post, "/api/customers/login", user);
    console.log(res);
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
    // const action = yield take([ constants.LOG_OUT, constants.LOG_IN_FAILURE ]);
    // if (action.type === constants.LOG_OUT)
    //   yield cancel(task);
    // setAuthToken(false);
  }
}

export function* watchUserLogin() {
  yield fork(userLogInFlow)
}

export function* userLogOutFlow() {
  while (true) {
    yield take(constants.LOG_OUT);
    setAuthToken(false);
    yield put(recipesLogOut());
  }
}

export function* watchUserLogOut() {
  yield fork(userLogOutFlow)
}