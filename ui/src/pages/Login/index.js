import { Link } from "react-router-dom";
import PublicContainer from "components/Containers/PublicContainer";

const Login = () => {
  return (
    <PublicContainer>
      <div style={{ height: "100vh" }}>
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
              <span className="auth-text-sm d-block">
                Don't have an account?
              </span>
              <Link className="btn bg-green text-white border border-white px-5 mt-3">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="col-md-7 d-flex justify-content-center align-items-center">
            <div>
              <h3 className="text-green auth-text-lg">
                Sign in to Budget Tracker
              </h3>
              <div className="mt-4">
                <form>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn text-white px-5"
                      style={{ backgroundColor: "#00bfa6" }}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicContainer>
  );
};

export default Login;
