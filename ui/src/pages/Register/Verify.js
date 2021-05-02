import { Link } from "react-router-dom";

const Verify = () => {
  return (
    <div
      className="bg-light center d-flex justify-content-center align-items-center"
      style={{ height: "600px", width: "900px" }}
    >
      <div className="text-center">
        {/*
          * to do

            add  gif here

        */}
        <h2 className="text-green">Hooray!</h2>
        <span className="d-block auth-text-sm">
          You have successfully verified your account!
        </span>
        <br />
        <Link className="btn bg-green px-5 text-white" to="/login">
          Login to your account
        </Link>
      </div>
    </div>
  );
};

export default Verify;
