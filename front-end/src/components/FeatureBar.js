import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/FeatureBar.css";

const FeatureBar = ({ history }) => {
  //   const { history } = props;
  return (
    <div className="features">
      <Link className="home" to="/">
        Home
      </Link>
      <Link className="dashboard" to="/dashboard">
        Dashboard
      </Link>
      <Link className="auctions" to="/auctions">
        Auctions
      </Link>
    </div>
  );
};

export default FeatureBar;
