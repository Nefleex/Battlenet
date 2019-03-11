import React, { useEffect } from "react";
import "./styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-title">title</div>
      <div className="header-login">
        <button>login</button>
      </div>
      <div className="header-login">
        <button>sign up</button>
      </div>
    </div>
  );
};

export default Header;
