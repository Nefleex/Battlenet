import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getDashboard } from "../actions/actionCreators";
import "./styles/Dashboard.css";

const Dashboard = ({ getDashboard, ...props }) => {
  useEffect(() => {
    const urls = [
      "http://localhost:3000/api/v1/auctions/max?amount=true&limit=4",
      "http://localhost:3000/api/v1/auctions/max?owner=true&limit=4",
      "http://localhost:3000/api/v1/auctions/max?price=true&limit=4"
    ];
    getDashboard();
  }, []);
  return (
    <Fragment>
      <div className="dashboard-main">
        <div>
          <button onClick={() => console.log(props)}>click</button>
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  // const { auctions, error, loading } = state.Auction;
  return {
    auctions: state.Auction,
    loadStatus: state.Loading
  };
}

export default connect(
  mapStateToProps,
  { getDashboard }
)(Dashboard);
