import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { GetUserDetailRequest } from "store/actionCreators/auth";
import { setAuthHeaderToken, unsetAuthHeaderToken } from "services";

import Loading from "components/Loading";

const PublicRoute = (props) => {
  const { component: Component, redirectPath, path, ...rest } = props;

  const [isReady, setIsReady] = useState(false);
  const [auth, setAuth] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setAuthHeaderToken();
    new Promise((resolve, reject) => {
      dispatch(GetUserDetailRequest({ resolve, reject }));
    })
      .then(() => {
        setAuth(true);
      })
      .catch(() => {
        //Should dispatch logout here
        unsetAuthHeaderToken();
      })
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  if (!isReady) {
    return <Loading />;
  }

  if (auth) {
    return <Redirect to={redirectPath || "/"} />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;
