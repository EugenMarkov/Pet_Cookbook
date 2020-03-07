import axios from "axios";
import jwt from "jwt-decode";
import * as constants from "../constants";
import setAuthToken from "../../components/common/setAuthToken";
import { recipesLogOut } from "./recipes";
import isExpired from "../../components/common/isExpired/isExpired";
import { loadUserData } from "./userProfile";
import { loadRecipes } from "./recipes";

export const logInRequest = (user) => {
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
  return{
    type: constants.MODAL_OPEN,
  }
};

export const modalClose = () => {
  return{
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

export const logIn = user => dispatch => {
  axios
    .post("/api/customers/login", user)
    .then(response => {
      if (response.statusText === "OK" && response.data.success) {
        setAuthToken(response.data.token);
        dispatch(userFromJwt(jwt(response.data.token)));
      }
      dispatch(modalClose());
      dispatch(loadUserData());
      dispatch(loadRecipes());
    })
    .catch(error => {
      dispatch(logInFailure(error));
    });
};

export const LogInOrLogOut = () => dispatch => {
  const token = localStorage.getItem("authTokenCookbook");

  if (token) {
    const isExpiredToken = isExpired(jwt(token));
    if (isExpiredToken) {
      setAuthToken(token);
      dispatch(userFromJwt(jwt(token)));
      // dispatch(preloaderClose());

      dispatch(loadUserData());
      dispatch(loadRecipes());

    } else {
      setAuthToken(false);
      dispatch(logOut());
      dispatch(recipesLogOut());
      // dispatch(preloaderClose());
    }
  } else {
    // dispatch(preloaderClose());
  }
};

export const logOutAll = () => dispatch => {
  setAuthToken(false);
  dispatch(logOut());
  dispatch(recipesLogOut());
};
