import React, { useEffect } from "react";
import "./styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-title">title</div>

      <button className="header-login">login</button>

      <button className="header-sign-up">sign up</button>
    </div>
  );
};

export default Header;
