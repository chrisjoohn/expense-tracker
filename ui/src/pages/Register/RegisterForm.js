import { Link } from "react-router-dom";

const RegisterForm = (props) => {
  const SubmitHandler = (e) => {
    e.preventDefault();
    props.history.push("/register/success");
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
            <form onSubmit={SubmitHandler}>
              <div className="row">
                <div className="col">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="form-control"
                  />
                </div>
              </div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
              />
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-control"
              />
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
