import axios from "axios";
import { takeLatest, put, call } from "redux-saga/effects";
import * as constants from "../constants";
import {loadUserFailure, loadUserSuccess} from "../actions/userProfile";


const fetchtUserPersonalData = () => {
  return axios.get("/api/customers/customer")
    .then(res => ({ res }))
    .catch(error => ({ error }))
};

export function* getUserData() {
  const { res, error } = yield call(fetchtUserPersonalData);
  res ? yield put(loadUserSuccess(res.data)) : yield put(loadUserFailure(error));
}

export function* watchUserData() {
  yield takeLatest(constants.USER_DATA_REQUEST, getUserData)
}
