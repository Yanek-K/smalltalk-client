import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { useSelector, useDispatch } from "react-redux";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Logo from "../images/LogoMain.png";

//Redux
import { logoutUser } from "../redux/actions/userActions";
import PostaPost from "./PostaPost";

const styles = {
  navbar: {
    display: "flex",
  },
  wrap: {
    display: "flex",
    justifyContent: "space-evenly",
    height: "20px",
    // width: "100%",
  },
  logo: {
    width: "7rem",
    marginLeft: "-100px",
  },
  navBarButtons: {
    display: "flex",
  },
  authUser: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    width: "150px",
    textTransform: "none",
    fontSize: "1.25rem",
    fontFamily: "Baskerrvville",
    marginTop: 15,
  },
  burgerMenu: {
    marginTop: 15,
  },
};

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
          <img src={Logo} alt="logo" className={classes.logo} edge="start" />
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
                  component={Link}
                  to="/"
                  className={classes.button}
                >
                  Notifications
                </Button>
                <Button
                  color="inherit"
                  onClick={() => dispatch(logoutUser())}
                  className={classes.button}
                >
                  Logout
                </Button>
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
          <div className={classes.burgerMenu}>
            <div>-</div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Navbar);
