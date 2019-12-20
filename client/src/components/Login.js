import React, { useState, useEffect } from "react";
import axiosWithAuth from "./utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  console.log(credentials, "handleChange");

  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
    </>
  );
};

export default Login;
