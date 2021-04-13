import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// MUI
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

//Redux
import { logoutUser } from "../../redux/actions/userActions";
import { closeSide } from "../../redux/actions/navActions";

//Components
import Notifications from "./Notifications";

const mapState = (state) => ({
  open: state.nav.open,
});

const styles = {
  wrap: {
    backgroundColor: "#5a6977",
    color: "white",
    display: "flex",
    flexDirection: "column",
    float: "right",
    // justifyContent: "center",
    height: 600,
    zIndex: "10000 !important",
    width: "250px",
    marginTop: -30,
    marginBottom: -1000,
    position: "relative",
  },
  button: {
    float: "right",
    margin: "15px 0",
    paddingTop: 20,
    fontSize: 15,
  },
};

const BurgerMenu = ({ classes }) => {
  const dispatch = useDispatch();
  const { open } = useSelector(mapState);
  return (
    <div>
      {open ? (
        <div className={classes.wrap}>
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
            <Button
              color="inherit"
              onClick={() => dispatch(closeSide())}
              className={classes.button}
            >
              X
            </Button>
          </Fragment>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default withStyles(styles)(BurgerMenu);
