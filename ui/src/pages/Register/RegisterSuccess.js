import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import Lottie from "react-lottie";

import animationData from "lotties/EmailSuccessAnimation.json";

import { ResendVerifyEmail } from "store/actionCreators/auth";

const RegisterSuccess = (props) => {
  const userEmail = localStorage.getItem("toVerifyEmail");
  const dispatch = useDispatch();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (!userEmail) {
    return <Redirect to="/register" />;
  }

  const ResendVerifyLinkhandler = (e) => {
    e.preventDefault();
    new Promise((resolve, reject) => {
      dispatch(
        ResendVerifyEmail({ resolve, reject, data: { email: userEmail } })
      );
    })
      .then(() => {
        alert("Successfully sent an an email to " + userEmail);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="bg-light center d-flex justify-content-center align-items-center"
      style={{ height: "600px", width: "900px" }}
    >
      <div className="text-center">
        <Lottie
          options={defaultOptions}
          height={200}
          width={200}
          autoplay={true}
        />
        <h2 className="text-green">Just one more.</h2>
        <span className="d-block auth-text-sm">
          We have sent a verification link to your email:{" "}
          <span className="font-weight-bold">{userEmail}</span>
          <br />
          <small className="">
            Didn't receive any email?{" "}
            <a
              className="text-primary"
              href="#"
              onClick={ResendVerifyLinkhandler}
            >
              Resend
            </a>
          </small>
        </span>
      </div>
    </div>
  );
};

export default RegisterSuccess;
