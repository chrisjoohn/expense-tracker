import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import { RegisterRequest } from "store/actionCreators/auth";

const RegisterForm = (props) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const { register, handleSubmit } = useForm();

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
        console.log(err);
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
                  <input
                    type="text"
                    placeholder="First name"
                    className="form-control"
                    {...register("firstName", { required: true })}
                    required
                  />
                </div>
                <div className="col">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="form-control"
                    {...register("lastName", { required: true })}
                    required
                  />
                </div>
              </div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                {...register("email", { required: true })}
                required
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className={classNames(
                  "form-control",
                  errors?.password && "border border-danger text-danger"
                )}
                {...register("password", { required: true })}
                required
              />
              {errors?.password && (
                <small className="text-danger">{errors.password}</small>
              )}
              <br />
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className={classNames(
                  "form-control",
                  errors?.password1 && "border border-danger text-danger"
                )}
                {...register("password1", { require: true })}
                required
              />
              {errors?.password1 && (
                <small className="text-danger">{errors.password1}</small>
              )}
              <div className="text-center">
                <button
                  className="btn  bg-green mt-4 text-white px-5"
                  type="submit"
                >
                  Register
                </button>
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
