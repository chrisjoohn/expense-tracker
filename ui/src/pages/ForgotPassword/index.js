import { useEffect } from "react";
import { Link } from "react-router-dom";
import PublicContainer from "components/Containers/PublicContainer";

const ForgotPassword = (props) => {
  useEffect(() => {
    alert("This part is under construction!");
    props.history.push("/login");
  }, []);
  return (
    <PublicContainer>
      <div
        className="bg-light center row"
        style={{ height: "600px", width: "900px" }}
      ></div>
    </PublicContainer>
  );
};

export default ForgotPassword;
