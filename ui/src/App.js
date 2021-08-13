import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "pages/Login";
import Register from "pages/Register";
import ForgotPassword from "pages/ForgotPassword";
import Dashboard from "pages/Dashboard";

import PrivateRoute from "components/Routes/PrivateRoute";
import PublicRoute from "components/Routes/PublicRoute";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  useEffect(() => {
    let loadingElement = document.getElementById("loading-container");
    loadingElement.remove();
  }, []);

  return (
    <Switch>
      <PublicRoute path="/forgot-password" component={ForgotPassword} />
      <PublicRoute path="/register" component={Register} />
      <PublicRoute path="/login" component={Login} />
      <PrivateRoute path="/" component={Dashboard} />
    </Switch>
  );
};

export default App;
