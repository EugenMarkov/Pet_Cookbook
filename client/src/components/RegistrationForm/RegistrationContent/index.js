import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useStyles from "./useStyles";

const RegistrationContent = ({
  setSubmitRegistration,
  handleChange,
  handleClickShowPassword,
  newUserData,
  showPassword,
  message,
}) => {
  const matches = useMediaQuery(theme => theme.breakpoints.down("xs"));
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <div className={classes.wrapper}>
        <h3 className={classes.title}>Registration Form</h3>
        <ValidatorForm
          noValidate={false}
          onSubmit={() => setSubmitRegistration(true)}
          autoComplete="off"
        >
          <TextValidator
            label="First Name"
            variant="outlined"
            name="firstName"
            value={newUserData.firstName}
            onChange={handleChange}
            className={classes.textField}
            size={matches ? "small" : null}
            inputProps={{
              maxLength: 25,
            }}
            validators={["required", "matchRegexp:^[`'\"()A-Za-zd.s_-]{2,25}$"]}
            errorMessages={[
              "this field is required",
              "Your name must be more then 2 characters, including only latin letters",
            ]}
            FormHelperTextProps={{
              className: classes.helper
            }}
          />
          <TextValidator
            label="Last Name"
            variant="outlined"
            name="lastName"
            value={newUserData.lastName}
            onChange={handleChange}
            className={classes.textField}
            size={matches ? "small" : null}
            inputProps={{
              maxLength: 25,
            }}
            validators={["matchRegexp:^[`'\"()A-Za-zd.s_-]{2,25}$", "required"]}
            errorMessages={[
              "Your last name must be more then 2 characters, including only latin letters",
              "this field is required",
            ]}
            FormHelperTextProps={{
              className: classes.helper
            }}
          />
          <TextValidator
            label="Login"
            variant="outlined"
            name="login"
            value={newUserData.login}
            onChange={handleChange}
            className={classes.textField}
            size={matches ? "small" : null}
            inputProps={{
              maxLength: 22,
            }}
            validators={["required", "matchRegexp:^[a-zA-Z0-9]{3,22}$"]}
            errorMessages={[
              "this field is required",
              "Your login must be 3-22 characters, including only latin letters and numbers",
            ]}
            FormHelperTextProps={{
              className: classes.helper
            }}
          />
          <TextValidator
            label="Email"
            variant="outlined"
            name="email"
            value={newUserData.email}
            onChange={handleChange}
            className={classes.textField}
            size={matches ? "small" : null}
            inputProps={{
              autoComplete: "email",
            }}
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
            FormHelperTextProps={{
              className: classes.helper
            }}
          />

          <TextValidator
            className={classes.textField}
            variant="outlined"
            label="Password"
            name="password"
            value={newUserData.password}
            onChange={handleChange}
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
              autoComplete: "new-password",
            }}
            validators={["required", "matchRegexp:^[a-zA-Z0-9]{8,16}$"]}
            errorMessages={[
              "this field is required",
              "Your password must be 8-16 characters, including only latin letters and numbers",
            ]}
            FormHelperTextProps={{
              className: classes.helper
            }}
          />
          <Button type="submit" variant="outlined" className={classes.btn}>
            Registration
          </Button>
        </ValidatorForm>
        {message && <p className={classes.errText}>{message}</p>}
      </div>
    </div>
  );
};

export default RegistrationContent;
