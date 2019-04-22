import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/userActionCreators";
import "./styles/Header.css";
import spyimg from "./spyimg.png";

const Header = props => {
  const {
    user: { user },
    logout
  } = props;
  if (!user) {
    return (
      <div className="header">
        <div className="header-title-items">
          <img className="header-logo" src={spyimg} alt="Logo" />
          <div className="header-title">Spectacle</div>
        </div>
        <nav className="header-nav">
          <NavLink className="header-home" to="/">
            Home
          </NavLink>
          <NavLink className="header-dashboard" to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="header-auctions" to="/auctions">
            Auctions
          </NavLink>

          <NavLink className="header-about" exact to="/about">
            About
          </NavLink>
        </nav>
        <div className="user-actions">
          <NavLink className="header-login" to="/login">
            login
          </NavLink>
          <NavLink className="header-sign-up" to="/register">
            sign up
          </NavLink>
        </div>
      </div>
    );
  } else if (user) {
    return (
      <div className="header">
        <div className="header-title-items">
          <img className="header-logo" src={spyimg} alt="Logo" />
          <div className="header-title">Spectacle</div>
        </div>

        <nav className="header-nav">
          <NavLink className="header-home" to="/">
            Home
          </NavLink>
          <NavLink className="header-dashboard" to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="header-auctions" to="/auctions">
            Auctions
          </NavLink>
          <NavLink className="header-tracking" exact to="/tracking">
            Tracking
          </NavLink>
          <NavLink className="header-about" exact to="/about">
            About
          </NavLink>
        </nav>

        <div className="user-actions">
          <NavLink
            className="header-logout"
            to="/login"
            onClick={() => logout()}
          >
            logout
          </NavLink>
        </div>
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
