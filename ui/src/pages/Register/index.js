import { Switch, Route } from "react-router-dom";

import PublicContainer from "components/Containers/PublicContainer";

//Internal Components
import RegisterForm from "./RegisterForm";
import Verify from "./Verify";

const Register = (props) => {
  return (
    <PublicContainer>
      <Switch>
        <Route path={props.match.url + "/verify"} component={Verify} exact />
        <Route path={props.match.url} component={RegisterForm} />
      </Switch>
    </PublicContainer>
  );
};

export default Register;
