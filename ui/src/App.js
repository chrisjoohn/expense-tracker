import { Switch, Route, Redirect } from "react-router-dom";

import Login from "pages/Login";
import Register from "pages/Register";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route>
        <Redirect from="/" to="/login" />
      </Route>
    </Switch>
  );
};

export default App;
