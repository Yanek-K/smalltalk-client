import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const mapState = (state) => ({
  authenticated: state.user.authenticated,
});

const AuthRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector(mapState);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
