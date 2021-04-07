import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Logo from "../images/LogoMain.png";

const styles = {
  navbar: {
    display: "flex",
  },
  wrap: {
    display: "flex",
    justifyContent: "space-around",
    height: "20px",
  },
  logo: {
    width: "7rem",
    marginLeft: "-20px",
  },
  navBarButtons: {
    display: "flex",
  },
  button: {
    width: "150px",
    textTransform: "none",
    fontSize: "1.25rem",
    fontFamily: "Baskerrvville",
    marginTop: 15,
  },
};

const Navbar = ({ classes }) => {
  return (
    <div className={classes.navBar}>
      <AppBar>
        <Toolbar className={classes.wrap}>
          <img src={Logo} alt="logo" className={classes.logo} edge="start" />
          <div className="navBarButtons">
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
          </div>
          <div>
            <p>Burger Menu</p>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Navbar);
