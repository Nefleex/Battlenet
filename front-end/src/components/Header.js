import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/userActionCreators";
import "./styles/Header.css";

const Header = props => {
  const {
    user: { user },
    logout
  } = props;
  if (!user) {
    return (
      <div className="header">
        <div className="header-title">title</div>
        <NavLink className="header-login" to="/login">
          login
        </NavLink>
        <NavLink className="header-sign-up" to="/register">
          sign up
        </NavLink>
      </div>
    );
  } else if (user) {
    return (
      <div className="header">
        <div className="header-title">title</div>
        <NavLink className="header-login" to="/login">
          login
        </NavLink>
        <NavLink className="header-sign-up" to="/register">
          sign up
        </NavLink>
        <NavLink className="header-logout" to="/login" onClick={() => logout()}>
          logout
        </NavLink>
        <NavLink className="header-tracking" exact to="/tracking">
          TRACKING
        </NavLink>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return { user: state.User };
};

export default connect(
  mapStateToProps,
  { logout }
)(Header);
