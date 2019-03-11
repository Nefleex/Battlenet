import React, { useEffect } from "react";
import "./styles/Layout.css";
import Header from "./Header";
import FeatureBar from "./FeatureBar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Layout = ({ history, ...props }) => {
  // useEffect(() => {
  //   fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
  //     .then(data => data.json())
  //     .then(data => {
  //       console.log(data.results);
  //       receiveAuctions(data.results);
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  return (
    <div className="layout">
      <Header />
      <div className="filler" />
      <FeatureBar history={history} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default withRouter(connect(mapStateToProps)(Layout));
