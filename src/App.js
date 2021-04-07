import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider as MUIThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

//Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MUIThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <div className="nav">
            <Navbar />
          </div>
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <AuthRoute
                path="/login"
                component={Login}
                authenticated={authenticated}
              />
              <AuthRoute
                path="/signup"
                component={Signup}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </div>
    </MUIThemeProvider>
  );
}

export default App;
