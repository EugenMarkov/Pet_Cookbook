import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import { AuthHOC } from "../components/common/HOC/AuthHOC";
import { RegistrationHOC } from "../components/common/HOC/RegistrationHOC";
import Preloader from "../components/Preloader";

import { LogInOrLogOut } from "../store/actions/loginActions";

const Routes = ({ isPreloader, CheckLogInOrLogOut }) => {
  useEffect(() => {
    CheckLogInOrLogOut();
  }, [CheckLogInOrLogOut]);

  return isPreloader ? (
    <Preloader />
  ) : (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/profile" component={AuthHOC(ProfilePage)} />
      <Route path="/registration" component={RegistrationHOC(RegistrationPage)} />
      <Redirect to="/" />
    </Switch>
  );
};

function mapStateToProps(state) {
  return {
    isPreloader: state.loginReducer.isPreloader,
  };
}

export default connect(mapStateToProps, { CheckLogInOrLogOut: LogInOrLogOut })(Routes);
