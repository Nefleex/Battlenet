import React from "react";
import { Link } from "react-router-dom";
const Expired = () => {
  const styles = {
    width: "90%",
    margin: "0 auto",
    marginTop: "20px",
    fontFamily: "var(--main-font)",
    padding: "10px"
  };
  return (
    <React.Fragment>
      <div style={styles}>
        Your session has expired. Please login again.
        <Link to="/login"> Click here to log in.</Link>
      </div>
    </React.Fragment>
  );
};
export default Expired;
