import * as constants from "../constants";

export const loadUserData = () => {
  return {
    type: constants.USER_DATA_REQUEST,
  };
};

export const loadUserSuccess = (data) => {
  return {
    type: constants.USER_DATA_SUCCESS,
    payload: data,
  };
};

export const loadUserFailure = (error) => {
  return {
    type: constants.USER_DATA_FAILURE,
    payload: error,
  };
};

export const editDataInit = () => {
  return {
    type: constants.EDIT_USER_DATA_INIT,
  };
};
export const editDataRequest = user => {
  return {
    type: constants.EDIT_USER_DATA_REQUEST,
    payload: user,
  };
};

export const editDataSuccess = data => {
  return {
    type: constants.EDIT_USER_DATA_SUCCESS,
    payload: data,
  };
};

export const editDataFailure = err => {
  return {
    type: constants.EDIT_USER_DATA_FAILURE,
    payload: err,
  };
};

