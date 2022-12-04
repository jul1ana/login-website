import React, { useState } from "react";
import { Link } from "react-router-dom";

import api from "../../config/configApi";

export const AddUser = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

  const addUser = async e => {
    e.preventDefault();

    const headers = {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }

    await api.post("/user", user, headers)
      .then((response) => {
        setStatus({
          type: "success",
          message: response.data.message
        });
      }).catch((err) => {
        if (err.response) {
          setStatus({
            type: "error",
            message: err.response.data.message
          });
        } else {
          setStatus({
            type: "error",
            message: "ERROR: Try again!"
          });
        }
      });
  }

  return (
    <div>
      <Link to="/dashboard">Dashboard</Link> <br />
      <Link to="/users">Users</Link> <br />

      <h1>Register User</h1>

      {status.type === "error" ? <p>{status.message}</p> : ""}
      {status.type === "success" ? <p>{status.message}</p> : ""}

      <form onSubmit={addUser}>
        <label>Name: </label>
        <input type="text" name="name" placeholder="User's full name" onChange={valueInput} /> <br /> <br />

        <label>E-mail: </label>
        <input type="email" name="email" placeholder="Best user email" onChange={valueInput} /> <br /> <br />

        <label>Password: </label>
        <input type="password" name="password" placeholder="Password to access the system" autoComplete="on" onChange={valueInput} /> <br /> <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};
