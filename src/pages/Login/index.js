import React, { useContext, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import api from "../../config/configApi";
import { Context } from "../../Context/AuthContext";

export const Login = () => {

  const { state } = useLocation();

  const navigate = useNavigate();

  const { signIn } = useContext(Context);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState({
    type: state ? state.type : "",
    message: state ? state.message : "",
    loading: false
  });

  //recuperando o valor do input
  const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

  const loginSubmit = async e => {
    e.preventDefault();
    // console.log(user.email);
    // console.log(user.password);
    setStatus({
      loading: true
    });

    // conexão com API
    const headers = {
      "Content-Type": "application/json"
    }

    await api.post("/login", user, { headers })
      .then((response) => {
        // console.log(response);
        setStatus({
          // type: "success",
          // message: response.data.message,
          loading: false
        });
        localStorage.setItem("token", response.data.token);
        signIn(true); // funcao chamada apenas se o usuario conseguir realizar o login
        return navigate("/dashboard");
      }).catch((err) => {
        if (err.response) {
          // console.log(err.response);
          setStatus({
            type: "error",
            message: err.response.data.message,
            loading: false
          });
        } else {
          // console.log("Error: try later");
          setStatus({
            type: "error",
            message: "Error: try later",
            loading: false
          });
        }
      });
  }

  return (
    <div>
      <h1>Login</h1>

      {status.type === "error" ? <p style={{ color: "#ff0000" }}>{status.message}</p> : ""}
      {status.type === "success" ? <p style={{ color: "green" }}>{status.message}</p> : ""}
      {status.loading ? <p>Checking...</p> : ""}

      <form onSubmit={loginSubmit}>
        <label>User: </label>
        <input type="text" name="email" placeholder="Enter your email" onChange={valueInput} /> <br /><br />

        <label>Password: </label>
        <input type="password" name="password" placeholder="Enter your password" autoComplete="on" onChange={valueInput} /> <br /><br />

        {status.loading ? <button type="submit" disabled >Accessing...</button> : <button type="submit">Acessar</button>} <br /><br />
      </form>

      <Link to="/add-user-login">Register</Link> {" - "}
      <Link to="/recover-password">Forgot password</Link>
    </div>
  );
};