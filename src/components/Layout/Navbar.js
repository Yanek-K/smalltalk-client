import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { useSelector, useDispatch } from "react-redux";
import Notifications from "./Notifications";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Logo from "../../images/LogoMain.png";
import NotificationsIcon from "@material-ui/icons/Notifications";

//Redux
import { logoutUser } from "../../redux/actions/userActions";
import { openSide } from "../../redux/actions/navActions";

const styles = (theme) => ({
  navbar: {
    display: "flex",
  },
  wrap: {
    display: "flex",
    justifyContent: "space-evenly",
    height: "20px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      marginLeft: 0,
      paddingLeft: 0,
      justifyContent: "space-evenly",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "space-evenly",
    },
  },
  logo: {
    width: "7rem",
    marginLeft: "-70px",
    [theme.breakpoints.down("sm")]: {
      width: "6.5rem",
      marginRight: "0px",
      marginLeft: "-80px",
    },
  },

  navBarButtons: {
    display: "inline-block",
  },
  authUser: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    textTransform: "none",
    fontSize: "1.25rem",
    fontFamily: "Baskerrvville",
    marginTop: 15,
    marginRight: "3rem",
    [theme.breakpoints.down("sm")]: {
      marginRight: "0.9rem",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  burgerMenu: {
    marginBottom: 50,
    marginRight: -100,
    cursor: "pointer",
  },
  burgerItems: {
    color: "#314455",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      color: "white",
      // maxHeight: "1%",
      marginBottom: -34,
      fontSize: 30,
    },
  },
});

const mapState = (state) => ({
  authenticated: state.user.authenticated,
});

const Navbar = ({ classes }) => {
  const { authenticated } = useSelector(mapState);
  const dispatch = useDispatch();

  return (
    <div className={classes.navBar}>
      <AppBar>
        <Toolbar className={classes.wrap}>
          <Link to="/">
            <img src={Logo} alt="logo" className={classes.logo} edge="start" />
          </Link>
          <div className="navBarButtons">
            {authenticated ? (
              <Fragment>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  className={classes.button}
                >
                  Home
                </Button>

                <Button
                  color="inherit"
                  onClick={() => dispatch(logoutUser())}
                  className={classes.button}
                >
                  Logout
                </Button>
                <Notifications />
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  className={classes.button}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  className={classes.button}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/signup"
                  className={classes.button}
                >
                  Signup
                </Button>
              </Fragment>
            )}
          </div>
          <div
            className={classes.burgerMenu}
            onClick={(e) => dispatch(openSide())}
          >
            <div className={classes.burgerItems}>_</div>
            <div className={classes.burgerItems}>_</div>
            <div className={classes.burgerItems}>_</div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Navbar);