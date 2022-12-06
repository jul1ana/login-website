import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

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

    if (!validate()) return;

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

  const messageAdd = {
    type: status.type,
    message: status.message
  }

  function validate() {
    if (!user.name) return setStatus({
      type: "error",
      message: "ERROR: Need to fill in the name field!"
    });

    if (!user.email) return setStatus({
      type: "error",
      message: "ERROR: Need to fill in the e-mail field!"
    });

    if (!user.password) return setStatus({
      type: "error",
      message: "ERROR: Need to fill in the password field!"
    });
    if (user.password.length < 6) return setStatus({
      type: "error",
      message: "ERROR: Password must be at least 6 characters long!"
    });

    return true;
  }

  return (
    <div>
      <Link to="/dashboard">Dashboard</Link> <br />
      <Link to="/users">Users</Link> <br />

      <h1>Register User</h1>
      <Link to="/users"><button type="button">List</button></Link> <br />

      {status.type === "error" ? <p style={{ color: "#ff0000" }}>{status.message}</p> : ""}
      {status.type === "success"
        ? <Navigate to="/users" state={messageAdd} />
        : ""}

      <hr />

      <form onSubmit={addUser}>
        <label>Name*: </label>
        <input type="text" name="name" placeholder="User's full name" onChange={valueInput} /> <br /> <br />

        <label>E-mail*: </label>
        <input type="email" name="email" placeholder="Best user email" onChange={valueInput} /> <br /> <br />

        <label>Password*: </label>
        <input type="password" name="password" placeholder="Password to access the system" autoComplete="on" onChange={valueInput} /> <br /> <br />

        * Required field <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};
