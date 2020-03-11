import * as constants from "../constants";

export const logInRequest = user => {
  return {
    type: constants.LOG_IN_REQUEST,
    payload: user,
  };
};

export const logInSuccess = () => {
  return {
    type: constants.LOG_IN_SUCCESS,
  };
};

export const logInFailure = error => {
  return {
    type: constants.LOG_IN_FAILURE,
    payload: error,
  };
};

export const modalOpen = () => {
  return {
    type: constants.MODAL_OPEN,
  }
};

export const modalClose = () => {
  return {
    type: constants.MODAL_CLOSE,
  }
};

export const userFromJwt = data => {
  return {
    type: constants.USER_FROM_JWT,
    payload: data,
  };
};

export const preloaderClose = () => {
  return {
    type: constants.PRELOADER_CLOSE,
  };
};

export const logOut = () => {
  return {
    type: constants.LOG_OUT,
  };
};

export const LogInOrLogOut = () => {
  return {
    type: constants.LOG_IN_OR_LOG_OUT_CHECK,
  };
};
