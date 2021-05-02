import { Switch, Route } from "react-router-dom";

import PublicContainer from "components/Containers/PublicContainer";

//Internal Components
import RegisterForm from "./RegisterForm";
import RegisterSuccess from "./RegisterSuccess";
import Verify from "./Verify";

const Register = (props) => {
  return (
    <PublicContainer>
      <Switch>
        <Route path={props.match.url + "/verify"} component={Verify} />
        <Route
          path={props.match.url + "/success"}
          component={RegisterSuccess}
          exact
        />
        <Route path={props.match.url} component={RegisterForm} />
      </Switch>
    </PublicContainer>
  );
};

export default Register;
