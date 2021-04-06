import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider as MUIThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

//Components
import Navbar from "./components/Navbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#222f3b",
      main: "#314455",
      dark: "#5a6977",
    },
    secondary: {
      light: "#679944",
      main: "#82c43c",
      dark: "#4c6e4c",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

function App() {
  return (
    <MUIThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MUIThemeProvider>
  );
}

export default App;
