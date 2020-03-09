import axios from "axios";
import { takeLatest, put, call, take } from "redux-saga/effects";
import * as constants from "../constants";
import {
  editDataFailure,
  editDataSuccess,
  loadUserFailure,
  loadUserSuccess,
} from "../actions/userProfile";

const fetchtUserPersonalData = () => {
  return axios
    .get("/api/customers/customer")
    .then(res => ({ data: res.data }))
    .catch(error => ({ error }));
};

export function* getUserData() {
  const { data, error } = yield call(fetchtUserPersonalData);
  data ? yield put(loadUserSuccess(data)) : yield put(loadUserFailure(error));
}

export function* watchUserData() {
  yield takeLatest(constants.USER_DATA_REQUEST, getUserData);
}

const fetchUpdatedUserData = updatedCustomer => {
  return axios
    .put("/api/customers", updatedCustomer)
    .then(updatedUser => ({ updatedData: updatedUser.data }))
    .catch(error => ({ error }));
};

export function* saveUserData() {
  const { payload } = yield take(constants.EDIT_USER_DATA_REQUEST);
  const { updatedData, error } = yield call(fetchUpdatedUserData, payload);
  updatedData ? yield put(editDataSuccess(updatedData)) : yield put(editDataFailure(error));
}

export function* watchEditUserData() {
  yield takeLatest(constants.EDIT_USER_DATA_INIT, saveUserData);
}
