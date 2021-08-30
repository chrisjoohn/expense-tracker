import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { RegisterRequest } from "store/actionCreators/auth";

const InputFieldError = styled.span`
  color: red;
  font-size: 12px;
`;

const InputField = styled.input`
  color: ${({ hasError }) => hasError && "red"};
  border: ${({ hasError }) => hasError && "1px solid red"};
`;

const InputDiv = styled.div`
  display: "block";
`;

const SubmitBtn = styled.button`
  cursor: ${({ disabled }) => disabled && "not-allowed"};
`;

const ErrorMessage = (props) => {
  const { errors, field } = props;

  if (errors[field] && errors[field].type === "required") {
    return <InputFieldError>This field is required</InputFieldError>;
  }

  if (errors[field] && errors[field].type === "manual") {
    return <InputFieldError>{errors[field].message}</InputFieldError>;
  }

  return null;
};

const RegisterForm = (props) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    setError,
  } = useForm();

  const SubmitHandler = (data) => {
    const { password, password1 } = data;
    setErrors({});
    if (password !== password1) {
      setErrors({
        ...errors,
        password: "Password does not match",
        password1: "Password does not match",
      });
      return;
    }

    new Promise((resolve, reject) => {
      dispatch(RegisterRequest({ resolve, reject, data }));
    })
      .then(() => {
        props.history.push("/register/success");
      })
      .catch((err) => {
        const { errors } = err.data;
        Object.keys(errors).map((key) => {
          setError(key, { type: "manual", message: errors[key].message });
        });
      });
  };

  return (
    <div
      className="bg-light center row"
      style={{ height: "600px", width: "900px" }}
    >
      <div className="col-md-7 d-flex justify-content-center align-items-center text-center">
        <div>
          <h3 className="text-green auth-text-lg">Create an Account</h3>
          <div className="mt-4 text-left">
            <form onSubmit={handleSubmit(SubmitHandler)}>
              <div className="row">
                <div className="col">
                  <label>First name</label>
                  <InputField
                    type="text"
                    placeholder="First name"
                    className="form-control"
                    {...register("firstName", { required: true })}
                    hasError={formErrors.firstName}
                  />
                  <ErrorMessage errors={formErrors} field="firstName" />
                </div>
                <div className="col">
                  <label>Last name</label>
                  <InputField
                    type="text"
                    placeholder="Last name"
                    className="form-control"
                    {...register("lastName", { required: true })}
                    hasError={formErrors.lastName}
                  />
                  <ErrorMessage errors={formErrors} field="lastName" />
                </div>
              </div>
              <InputDiv>
                <label>Email</label>
                <InputField
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  {...register("email", { required: true })}
                  hasError={formErrors.email}
                />
                <ErrorMessage errors={formErrors} field="email" />
              </InputDiv>
              <InputDiv>
                <label>Password</label>
                <InputField
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  {...register("password", { required: true })}
                  hasError={formErrors.password || errors?.password}
                />
                <ErrorMessage errors={formErrors} field="password" />
                {errors?.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </InputDiv>
              <InputDiv>
                <label>Confirm Password</label>
                <InputField
                  type="password"
                  placeholder="Confirm password"
                  className="form-control"
                  {...register("password1", { required: true })}
                  hasError={formErrors.password1 || errors?.password1}
                />
                <ErrorMessage errors={formErrors} field="password1" />
                {errors?.password1 && (
                  <small className="text-danger">{errors.password1}</small>
                )}
              </InputDiv>
              <div className="text-center">
                <SubmitBtn
                  className="btn  bg-green mt-4 text-white px-5"
                  type="submit"
                  disabled={isSubmitting || Object.keys(formErrors).length}
                >
                  Register
                </SubmitBtn>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-5 text-center bg-green text-white d-flex justify-content-center align-items-center">
        <div>
          <h3 className="auth-text-lg">Hi there!</h3>
          <span className="auth-text-sm d-block">
            We are very excited to have you!
          </span>
          <span className="auth-text-sm">
            Enter your details and get started.
          </span>
          <hr />
          <Link
            className="btn bg-green text-white border border-white px-5 mt-3"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
