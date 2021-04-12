import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/LogoNoBack.png";
import { Link, useHistory } from "react-router-dom";

//Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { loginUser } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,

  image: {
    margin: "80px auto 25px auto",
    width: "25%",
    [theme.breakpoints.down("xs")]: {
      width: "20%",
      marginTop: 30,
    },
  },
  pageTitle: {
    margin: "10px auto 20px auto",
    fontFamily: "Baskervville",
    [theme.breakpoints.down("xs")]: {
      fontSize: "25px",
    },
  },
  textField: {
    margin: "10px auto 10px auto",
    [theme.breakpoints.down("sm")]: {
      width: "65%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "65%",
    },
  },
  button: {
    marginTop: 35,
    marginBottom: 20,
    width: "45%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "45%",
      marginBottom: 30,
    },
  },
});

const mapState = (state) => ({
  UI: state.UI,
});

const Login = ({ classes }) => {
  const { UI } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const loading = UI.loading;

  //  EDIT THIS WHEN ACTION IS CREATED
  // const errors = UI.errors

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData, history));
  };

  useEffect(() => {
    if (UI.errors !== null) {
      setErrors(UI.errors);
    }
  }, [UI.errors]);

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item>
        <img src={AppIcon} alt="logo" className={classes.image} />
        <Typography variant="h4" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Submit
            {loading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Not signed up yet? Sign up{" "}
            <Link to="/signup" className={classes.signupLink}>
              here
            </Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withStyles(styles)(Login);
