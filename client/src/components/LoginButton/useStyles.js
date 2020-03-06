import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "inline-flex",
    minWidth: 260,
    flexDirection: "row-reverse",
    [theme.breakpoints.down("sm")]: {
      minWidth: 50,
    },
  },
  link: {
    marginRight: "20px",
    textDecoration: "none",
    color: "black",
  },
  icon: {
    fontSize: "24px",
  },
  span: {
    display: "none",
    width: 200,
    [theme.breakpoints.up("sm")]: {
      marginRight: "15px",
      display: "inline-flex",
      justifyContent: "flex-end",
      alignItems: "center",
      cursor: "default",
    },
  },
  btn: {
    marginRight: 24,
  },
}));

export default useStyles;
