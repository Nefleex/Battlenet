import React, { useState } from "react";
import { connect } from "react-redux";
import { login, logout } from "../actions/userActionCreators";
import "./styles/Login.css";

const Login = ({ url, login, logout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeUsername = e => {
    setUsername(e.target.value);
  };
  const handleChangePassword = e => {
    setPassword(e.target.value);
  };
  const handleInvalidCredentials = async res => {
    if (res.status === 400) {
      const text = await res.text();
      console.log(text);
      // loginError();
    } else {
      console.log("all good");
    }
  };
  const handleSubmit = async () => {
    const body = {
      username,
      password
    };

    try {
      console.log("Clicked");
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      });
      handleInvalidCredentials(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="login-form">
      <label htmlFor="username">Username</label>
      <input
        name="username"
        type="text"
        className="username"
        id="username"
        value={username}
        onChange={e => handleChangeUsername(e)}
      />
      <br />
      <label htmlFor="passwprd">Password</label>
      <input
        name="password"
        type="text"
        className="password"
        id="username"
        value={password}
        onChange={e => handleChangePassword(e)}
      />
      <br />
      <button type="button" onClick={() => login(username, password, url)}>
        Login
      </button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(
  mapStateToProps,
  { login, logout }
)(Login);
