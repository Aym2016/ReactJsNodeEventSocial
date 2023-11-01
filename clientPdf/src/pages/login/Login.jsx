import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import React from "react";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };


  /*<div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">PDF Analysis</h3>
          <span className="loginDesc">
            welcom to World Books Analysis
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>*/
  return (

    <>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"></link>
    
   
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"></script> 

    <div className="loginRight">
  
  
  <form className="loginBox" onSubmit={handleClick}>
    <div className="mb-3">
      <input
        placeholder="Email"
        type="email"
        required
        className="form-control loginInput"
        ref={email}
      />
    </div>
    <div className="mb-3">
      <input
        placeholder="Password"
        type="password"
        required
        minLength="6"
        className="form-control loginInput"
        ref={password}
      />
    </div>
    <button className="btn btn-primary loginButton" type="submit" disabled={isFetching}>
      {isFetching ? (
        <div className="d-flex align-items-center">
          <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
          <span>Loading...</span>
        </div>
      ) : (
        "Log In"
      )}
    </button>
    <div className="mt-3">
      <span className="loginForgot">Forgot Password?</span>
    </div>
    <button className="btn btn-secondary loginRegisterButton" disabled={isFetching}>
      {isFetching ? (
        <div className="d-flex align-items-center">
          <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
          <span>Loading...</span>
        </div>
      ) : (
        "Create a New Account"
      )}
    </button>
  </form>
</div>  </>  
  );
}
