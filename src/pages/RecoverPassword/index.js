import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import api from "../../config/configApi";

export const RecoverPassword = () => {

  const [user, setUser] = useState({
    email: "",
    url: "http://localhost:3000/update-password/"
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
    loading: false
  });

  const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

  const recoverPassword = async e => {
    e.preventDefault();

    setStatus({
      loading: true
    });

    const headers = {
      "Content-Type": "application/json"
    }

    await api.post("/recover-password", user, { headers })
      .then((response) => {
        setStatus({
          type: "redirectedSuccess",
          message: response.data.message,
          loading: false
        });
      }).catch((err) => {
        if (err.response) {
          setStatus({
            type: "error",
            message: err.response.data.message,
            loading: false
          });
        } else {
          setStatus({
            type: "error",
            message: "Error: try later",
            loading: false
          });
        }
      });
  }

  const messageAddSuccess = {
    type: "success",
    message: status.message
  }

  return (
    <div>
      <h1>Recover Password</h1>

      {status.type === "error" ? <p style={{ color: "#ff0000" }}>{status.message}</p> : ""}
      {status.type === "success" ? <p style={{ color: "green" }}>{status.message}</p> : ""}
      {status.type === "redirectedSuccess"
        ? <Navigate to="/" state={messageAddSuccess} />
        : ""}

      <form onSubmit={recoverPassword}>
        <label>E-mail: </label>
        <input type="email" name="email" placeholder="Enter your email" onChange={valueInput} /> <br /><br />

        {status.loading ?
          <button type="submit" disabled >Sending...</button> :
          <button type="submit">Send</button>
        } <br /><br />
      </form>
      <br />

      <Link to="/add-user-login">Register</Link> {" "}
      - Remembered the password <Link to="/">click here</Link>
    </div>
  );
};