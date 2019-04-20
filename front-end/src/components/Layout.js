import React, { useEffect } from "react";
import "./styles/Layout.css";
import Header from "./Header";
import FeatureBar from "./FeatureBar";
import { withRouter } from "react-router-dom";

const Layout = ({ history }) => {
  return (
    <div className="layout">
      <Header />
      <div className="filler" />
      <div className="main-content">
        <FeatureBar history={history} />
      </div>
    </div>
  );
};

export default withRouter(Layout);
