import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  getUser} from "../features/users/userSlice";

const Login = ({ loginCredentials, setLoginCredentials }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    navigate("/home");
    dispatch(getUser());
  };

  return (
    <div id="loginContainer">
      <div id="loginForm">
        <div id="formTitle">
          <h2>Login</h2>
        </div>
        <hr />
        <div>
          <form id="loginFormField">
            <label>UserId</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={loginCredentials.userId}
              onChange={handleChange}
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginCredentials.password}
              onChange={handleChange}
              autoComplete="username"
            />
            <br />
            {/* <input type="button" onClick={handleSubmit} value="Login" /> */}
            <button type="submit" className="formButton" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
