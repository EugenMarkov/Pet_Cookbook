import React from "react";
import { connect } from "react-redux";
import LoginContent from "./LoginContent";
import { logInRequest, modalClose } from "../../store/actions/loginActions";

const LoginForm = ({ logInRequest, error, modal, modalClose }) => {
  const handleError = error => {
    if (error.response.data.loginOrEmail) {
      return error.response.data.loginOrEmail;
    }
    if (error.response.data.password) {
      return error.response.data.password;
    }
    return error.message;
  };

  const handleOpen = () => {
    modalClose();
  };

  const submitLogin = (e, user) => {
    e.preventDefault();
    logInRequest(user);
  };

  return (
    <>
      <LoginContent
        handleOpen={handleOpen}
        submitLogin={submitLogin}
        open={modal}
        message={error !== "" ? handleError(error) : ""}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: state.loginReducer.error,
    modal: state.loginReducer.isModalOpen,
  };
};

export default connect(mapStateToProps, { logInRequest, modalClose })(LoginForm);
