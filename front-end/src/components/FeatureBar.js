import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/FeatureBar.css";

const FeatureBar = ({ history }) => {
  //   const { history } = props;
  return (
    <div className="features">
      <div className="auction">Auction</div>
      <div className="owner">Owner</div>
      <Link to="/">TO 1</Link>
      <Link to="/2">TO 2</Link>
      <Link to="/3">TO 3</Link>
      <button onClick={() => history.push("/auctions")}>AUCTIONS</button>
    </div>
  );
};

export default FeatureBar;
