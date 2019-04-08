import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../actions/registerActionCreators";

const Register = ({ url, register }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeUsername = e => {
    setUsername(e.target.value);
  };
  const handleChangePassword = e => {
    setPassword(e.target.value);
  };
  const handleSubmit = async () => {
    const body = {
      username,
      password
    };
    try {
      fetch(url, {});
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="register-form">
      <label htmlFor="username">Username</label>
      <input
        name="username"
        type="text"
        className="username"
        id="username"
        value={username}
        onChange={e => handleChangeUsername(e)}
      />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="text"
        className="password"
        id="username"
        value={password}
        onChange={e => handleChangePassword(e)}
      />
      <button type="button" onClick={() => register(username, password, url)}>
        Register
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
  { register }
)(Register);
