import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AppIcon from "../images/LogoNoBack.png";

//Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,

  image: {
    margin: "80px auto 25px auto",
    width: "12%",
    [theme.breakpoints.up("md")]: {
      width: "10%",
      marginTop: 50,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "40px",
    },
  },
  pageTitle: {
    margin: "15px auto 20px auto",
    fontFamily: "Baskervville",
    fontSize: "27px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "25px",
    },
  },
  textField: {
    margin: "10px auto 15px auto",
    width: "55.2%",

    [theme.breakpoints.down("xs")]: {
      width: "65%",
    },
  },
  guest: {
    fontFamily: "Baskervville",
    marginTop: "1rem",
    lineHeight: "2rem",
    letterSpacing: "0.04rem",
    color: "#4c6e4c",
  },
  submit: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "65%",
    },
  },
  button: {
    marginTop: 45,
    marginBottom: 20,
    width: "30%",
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "35%",
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
          <div className={classes.submit}>
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
          </div>
          <p className={classes.guest}>
            To login as guest, use: <br />
            Email: guest123@mail.com <br />
            Password: guest123
          </p>
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
