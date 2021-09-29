import { Route, Switch } from "react-router";
import ConsentPage from "./pages/Consent/ConsentPage";
import Home from "./pages/Home/Home"
import LoginPage from "./pages/Login/LoginPage"
import './App.less'
import LogoutPage from "./pages/Logout/LogoutPage";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/login">
        <LoginPage/>
      </Route>
      <Route exact path="/consent">
        <ConsentPage/>
      </Route>
      <Route exact path="/logout">
        <LogoutPage/>
      </Route>
    </Switch>

  );
}

export default App;
