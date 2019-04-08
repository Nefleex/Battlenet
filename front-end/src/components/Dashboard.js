import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getDashboard } from "../actions/dashboardActionCreators";
import "./styles/Dashboard.css";

const Dashboard = ({ getDashboard, url, ...props }) => {
  useEffect(() => {
    getDashboard(url);
  }, []);
  const {
    dashboard: { response }
  } = props;
  return (
    <Fragment>
      <div className="dashboard-main">
        <div>
          <h4>Dashboard</h4>
          <div>{JSON.stringify(response)}</div>
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  // const { auctions, error, loading } = state.Auction;
  return {
    dashboard: state.Dashboard
  };
}

export default connect(
  mapStateToProps,
  { getDashboard }
)(Dashboard);
