import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../config/configApi";

export const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
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

      {status.type === "error" ? <p>{status.message}</p> : ""}
      {status.type === "success" ? <p>{status.message}</p> : ""}
      {status.loading ? <p>Checking...</p> : ""}

      <form onSubmit={loginSubmit}>
        <label>User: </label>
        <input type="text" name="email" placeholder="Enter your email" onChange={valueInput} /> <br /><br />

        <label>Password: </label>
        <input type="password" name="password" placeholder="Enter your password" onChange={valueInput} /> <br /><br />

        {status.loading ? <button type="submit" disabled >Accessing...</button> : <button type="submit">Acessar</button>}
      </form>
    </div>
  );
};