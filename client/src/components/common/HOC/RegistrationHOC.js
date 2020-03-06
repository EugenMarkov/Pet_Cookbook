import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

export const RegistrationHOC = ( Component ) => {
  const Wrapper = ({ isAuthenticated }) => isAuthenticated ? <Redirect to="/" /> : <Component /> ;

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.loginReducer.isAuthenticated,
    };
  };

  return connect(mapStateToProps)(Wrapper)
};
