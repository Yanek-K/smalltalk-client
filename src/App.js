import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./App.css";

//MUI
import { ThemeProvider as MUIThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import User from "./pages/user";

//Components
import Navbar from "./components/Layout/Navbar";
import AuthRoute from "./util/AuthRoute";
import axios from "axios";
import { themeFile } from "./util/theme";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

axios.defaults.baseURL =
  "https://us-central1-smalltalk-fb951.cloudfunctions.net/api";

function App() {
  return (
    <MUIThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className="nav">
            <Navbar />
          </div>
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <AuthRoute path="/login" component={Login} />
              <AuthRoute path="/signup" component={Signup} />
              <Route exact path="/users/:handle" component={User} />
              <Route
                exact
                path="/users/:handle/post/:postId"
                component={User}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MUIThemeProvider>
  );
}

export default App;
