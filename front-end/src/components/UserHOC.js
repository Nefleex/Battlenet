import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout, userError } from "../actions/userActionCreators";

const UserHOC = ({
  component: Component,
  url,
  logout,
  userError,
  ...props
}) => {
  const [loading, setLoading] = useState("true");
  const [authenticated, setAuthenticated] = useState("false");

  const getAuth = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const result = await fetch(url, {
        headers: new Headers({
          Authorization: `${token} `
        }),
        mode: "cors"
      });
      if (result.status === 200) {
        setLoading(false);
        setAuthenticated(true);
      } else {
        // In case of response not being status of 200, clear token and redux store of
        logout();
        userError("You have been logged out.");
        setAuthenticated(false);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAuth();
    console.log(props);
  }, []);

  if (loading) {
    return <div>Loading, please wait...</div>;
  }
  // If not authenticated, redirect, else return Component from props
  else if (!authenticated) return <Redirect to="/" />;
  else if (authenticated && !loading) {
    return (
      <Fragment>
        <Component {...props} />
      </Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.User.user
  };
};

export default connect(
  mapStateToProps,
  { logout, userError }
)(UserHOC);
