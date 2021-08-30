import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import styled from "styled-components";
import Alert from "react-bootstrap/Alert";

import { LoginRequest } from "store/actionCreators/auth";

import PublicContainer from "components/Containers/PublicContainer";

const InputFieldError = styled.span`
  color: red;
  font-size: 12px;
`;

const InputField = styled.input`
  color: ${({ hasError }) => hasError && "red"};
  border: ${({ hasError }) => hasError && "1px solid red"};
`;

const SubmitBtn = styled.button`
  cursor: ${({ disabled }) => disabled && "not-allowed"};
`;

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [credsError, setCredsError] = useState("");

  const dispatch = useDispatch();

  const SubmitHandler = (data) => {
    setCredsError("");
    new Promise((resolve, reject) => {
      setSubmitting(true);
      dispatch(LoginRequest({ resolve, reject, data }));
    })
      .then(() => {
        props.history.push("/");
      })
      .catch((err) => {
        setCredsError("Invalid email or password.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <PublicContainer>
      <div
        className="bg-light center row"
        style={{ height: "600px", width: "900px" }}
      >
        <div className="col-md-5 text-center py-5 px-4 bg-green text-white d-flex justify-content-center align-items-center">
          <div>
            <h3 className="auth-text-lg">Welcome!</h3>
            <span className="auth-text-sm d-block">
              We are very excited to have you!
            </span>
            <span className="auth-text-sm">
              Login and start managing your expenses
            </span>
            <hr />
            <span className="auth-text-sm d-block">Don't have an account?</span>
            <Link
              className="btn bg-green text-white border border-white px-5 mt-3"
              to="/register"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="col-md-7 d-flex justify-content-center align-items-center">
          <div>
            <h3 className="text-green auth-text-lg">
              Sign in to Budget Tracker
            </h3>
            {credsError && (
              <Alert style={{ marginTop: "20px" }} variant={"danger"}>
                {credsError}
              </Alert>
            )}
            <div className="mt-4">
              <form onSubmit={handleSubmit(SubmitHandler)}>
                <div className="form-group">
                  <label>Email</label>
                  <InputField
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    {...register("email", { required: true })}
                    hasError={errors.email || credsError}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <InputFieldError>This field is required</InputFieldError>
                  )}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <InputField
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    {...register("password", { required: true })}
                    hasError={errors.password || credsError}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <InputFieldError>This field is required</InputFieldError>
                  )}
                </div>
                <div className="text-center">
                  <SubmitBtn
                    type="submit"
                    className="btn text-white px-5 bg-green"
                    disabled={submitting}
                  >
                    Sign In
                  </SubmitBtn>
                </div>
              </form>
              <div className="text-center mt-4">
                <Link to="/forgot-password">Forgot your password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicContainer>
  );
};

export default Login;
