const Verify = (props) => {
  return (
    <div
      className="bg-light center d-flex justify-content-center align-items-center"
      style={{ height: "600px", width: "900px" }}
    >
      <div className="text-center">
        {/*
          * TO DO

            ADD  GIF HERE

        */}
        <h2 className="text-green">Just one more.</h2>
        <span className="d-block auth-text-sm">
          We have sent a verification link to your email:{" "}
          <span className="font-weight-bold">test@user.com</span>
          <span className="font-weight-bold"></span>
        </span>
      </div>
    </div>
  );
};

export default Verify;
