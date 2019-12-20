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

  const login = e => {
    e.preventDefault();
    console.log(credentials, "creds");
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        console.log(res, "response");
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch(err => console.log(err));
  };

  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
    </>
  );
};

export default Login;
