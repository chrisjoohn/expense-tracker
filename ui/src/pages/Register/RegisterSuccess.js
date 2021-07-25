import { Redirect } from "react-router-dom";
import Lottie from "react-lottie";

import animationData from "lotties/EmailSuccessAnimation.json";

const RegisterSuccess = (props) => {
  const userEmail = localStorage.getItem("toVerifyEmail");

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
    alert("This part is under construction");
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
        {/*

<iframe src="https://embed.lottiefiles.com/animation/35681"></iframe>
          * TO DO

            ADD  GIF HERE

        */}
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
