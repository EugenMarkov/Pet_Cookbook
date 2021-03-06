import React, { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import PreloaderAdaptiveSmall from "../../Preloader/AdaptiveSmall";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useStyles from "./useStyles";

const LoginContent = ({ handleOpen, submitLogin, open, message, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setValues] = useState({
    loginOrEmail: "",
    password: "",
  });

  const handleChange = event => {
    setValues({ ...user, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(() => !showPassword);
  };
  const matches = useMediaQuery(theme => theme.breakpoints.down("xs"));
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className={classes.wrapper}>
            <LockOpenIcon className={classes.icon} />
            <h3 className={classes.title}>LogIn</h3>
            <ValidatorForm
              noValidate={false}
              onSubmit={e => submitLogin(e, user)}
              autoComplete="off"
            >
              <TextValidator
                label="Login or Email"
                variant="outlined"
                name="loginOrEmail"
                value={user.loginOrEmail}
                onChange={e => handleChange(e)}
                className={classes.textField}
                size={matches ? "small" : null}
                inputProps={{
                  maxLength: 22,
                  autoComplete: "loginOrEmail",
                }}
                validators={[
                  "required",
                  `${"matchRegexp:^[a-zA-Z0-9]{3,22}" ||
                    "matchRegexp: ^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z]{2,4}"}`,
                ]}
                errorMessages={[
                  "this field is required",
                  "login must be 3-22 characters (latin letters and numbers) or use email",
                ]}
                FormHelperTextProps={{
                  className: classes.helper,
                }}
              />

              <TextValidator
                className={classes.textField}
                variant="outlined"
                label="Password"
                name="password"
                value={user.password}
                onChange={e => handleChange(e)}
                size={matches ? "small" : null}
                InputProps={{
                  type: showPassword ? "text" : "password",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        className={classes.iconPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 16,
                  autoComplete: "current-password",
                }}
                validators={["required", "matchRegexp:^[a-zA-Z0-9]{8,16}$"]}
                errorMessages={[
                  "this field is required",
                  "password must be 8-16 characters, only latin letters and numbers",
                ]}
                FormHelperTextProps={{
                  className: classes.helper,
                }}
              />
              <p className={classes.text}>
                Have not an account yet? &nbsp;
                <Link className={classes.regLink} to="/registration" onClick={handleOpen}>
                  <Typography className={classes.regLink} component="span">Registration</Typography>
                </Link>
              </p>
              {isLoading ? (
                <PreloaderAdaptiveSmall />
              ) : (
                <Button className={classes.btn} type="submit">
                  Login
                </Button>
              )}
            </ValidatorForm>
            {message && <Typography className={classes.errMsg}>{message}</Typography>}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default LoginContent;
