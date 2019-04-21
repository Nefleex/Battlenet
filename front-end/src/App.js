import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { userFromStorage } from "./actions/userActionCreators";
import UserHOC from "./components/UserHOC";
import Layout from "./components/Layout";
import Auctions from "./components/Auctions";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Tracking from "./components/Tracking";
import Home from "./components/Home";
import Expired from "./components/Expired";
import "./components/styles/App.css";

const authUrl = "http://localhost:3000/api/v1/auth";
const loginUrl = "http://localhost:3000/api/v1/users/login";
const registerUrl = "http://localhost:3000/api/v1/users/register";
const dashboardUrl = "http://localhost:3000/api/v1/auctions/dashboard";
const ownersUrl = "http://localhost:3000/api/v1/auctions/owners";
const trackUrl = "http://localhost:3000/api/v1/users/track";

const App = ({ userFromStorage }) => {
  // on App mount check if user is already logged in
  let persistingUser = checkStorage();
  if (persistingUser !== undefined) {
    persistingUser =
      JSON.parse(localStorage.auctions_app_user) ||
      JSON.parse(sessionStorage.auctions_app_user);
  }

  useEffect(() => {
    if (persistingUser) {
      userFromStorage(persistingUser);
    }
  }, []);
  return (
    <BrowserRouter>
      <Fragment>
        <Layout />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/expired" component={Expired} />
          <Route
            exact
            path="/dashboard"
            render={() => <Dashboard url={dashboardUrl} />}
          />
          <Route exact path="/auctions" component={Auctions} />
          <Route
            exact
            path="/tracking"
            render={props => (
              <UserHOC
                {...props}
                component={Tracking}
                url={authUrl}
                ownersUrl={ownersUrl}
                trackUrl={trackUrl}
              />
            )}
          />
          <Route exact path="/login" render={() => <Login url={loginUrl} />} />
          <Route
            exact
            path="/register"
            render={() => <Register url={registerUrl} />}
          />
          {/* <Route
          path="*"
          component={() => (
            <div>
              404: Not a valid website <Link to={"/"}>TO HOME</Link>{" "}
            </div>
          )}
        /> */}
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

const checkStorage = () => {
  if (localStorage.auctions_app_user) return localStorage.auctions_app_user;
  else if (sessionStorage.auctions_app_user)
    return sessionStorage.auctions_app_user;
  else if (
    !sessionStorage.auctions_app_user &&
    !sessionStorage.auctions_app_user
  )
    return undefined;
};

const mapStateToProps = state => {
  return {
    user: state.User.user
  };
};
export default connect(
  mapStateToProps,
  { userFromStorage }
)(App);
