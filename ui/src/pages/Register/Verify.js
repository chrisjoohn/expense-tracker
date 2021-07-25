import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import Lottie from "react-lottie";

import SuccessAnimationData from "lotties/SuccessAnimation.json";
import ChainAnimationData from "lotties/ChainLottie.json";

import { ResendVerifyEmail } from "store/actionCreators/auth";

const Verify = (props) => {
  const dispatch = useDispatch();
  const [verifySuccess, setVerifySuccess] = useState("");

  const search = new URLSearchParams(useLocation().search);

  const userEmail = localStorage.getItem("toVerifyEmail");

  useEffect(() => {
    const token = search.get("t");
    const success = search.get("success");

    props.history.push("/register/verify?success=true");
    setVerifySuccess(success);

    if (token) {
      localStorage.setItem("auth_token", token);
      localStorage.removeItem("toVerifyEmail");
    }
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: SuccessAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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

  if (verifySuccess !== "true") {
    return (
      <div
        className="bg-light center d-flex justify-content-center align-items-center"
        style={{ height: "600px", width: "900px" }}
      >
        <div className="text-center">
          <Lottie
            options={{ ...defaultOptions, animationData: ChainAnimationData }}
            height={200}
            width={200}
            autoplay={true}
          />
          <h2 className="text-green">Woopsie!</h2>
          <span className="d-block auth-text-sm">
            There's an error verifying your account!
          </span>
          <small className="">
            <a
              className="text-primary"
              href="#"
              onClick={ResendVerifyLinkhandler}
            >
              Resend Verification Link
            </a>
          </small>
          <br />
          <br />
          <Link className="btn bg-green px-5 text-white" to="/">
            Go back to login!
          </Link>
        </div>
      </div>
    );
  }

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
        <h2 className="text-green">Hooray!</h2>
        <span className="d-block auth-text-sm">
          You have successfully verified your account!
        </span>
        <br />
        <Link className="btn bg-green px-5 text-white" to="/">
          Go to Dashboard!
        </Link>
      </div>
    </div>
  );
};

export default Verify;
