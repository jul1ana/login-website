import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";

import api from "../../config/configApi";

export const AddUserLogin = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  const messageAdd = {
    type: "success",
    message: status.message
  }

  const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

  const addUser = async e => {
    e.preventDefault();

    if (!(await validate())) return;

    const headers = {
      "headers": {
        "Content-Type": "application/json"
      }
    };

    await api.post("/add-user-login", user, headers)
      .then((response) => {
        setStatus({
          type: "redirectedSuccess",
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

  async function validate() {
    let schema = yup.object().shape({
      password: yup.string("ERROR: Need to fill in the password field!")
        .required("ERROR: Need to fill in the password field!")
        .min(6, "ERROR: Password must be at least 6 characters long!"),
      email: yup.string("ERROR: Need to fill in the e-mail field!")
        .email("ERROR: Need to fill in the e-mail field!")
        .required("ERROR: Need to fill in the e-mail field!"),
      name: yup.string("ERROR: Need to fill in the name field!")
        .required("ERROR: Need to fill in the name field!")
    });

    try {
      await schema.validate({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        message: err.errors
      });
      return false;
    }
  }

  return (
    <div>
      <h1>Register User</h1>

      {status.type === "error" ? <p style={{ color: "#ff0000" }}>{status.message}</p> : ""}
      {status.type === "redirectedSuccess"
        ? <Navigate to="/" state={messageAdd} />
        : ""}

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

      <br />
      <Link to="/">Access</Link>
    </div>
  );
}