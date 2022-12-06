import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";

import { Menu } from "../../components/Menu";
import api from "../../config/configApi";

export const EditProfilePassword = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  const editUser = async e => {
    e.preventDefault();

    if (!(await validate())) return;

    const headers = {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }

    await api.put("/edit-profile-password", { password }, headers)
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
            message: "ERROR: Try later!"
          });
        }
      });
  }

  useEffect(() => {
    const getUser = async () => {
      const headers = {
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }

      await api.get("/view-profile", headers)
        .then((response) => {
          if (response.data.user) {
            setName(response.data.user.name);
            setEmail(response.data.user.email);
          } else {
            setStatus({
              type: "redirectedWarning",
              message: "ERROR: User not found!"
            });
          }
        }).catch((err) => {
          if (err.response) {
            setStatus({
              type: "redirectedWarning",
              message: err.response.data.message
            });
          } else {
            setStatus({
              type: "redirectedWarning",
              message: "ERROR: Try later!"
            });
          }
        });
    }

    getUser();
  }, []);

  async function validate() {
    let schema = yup.object().shape({
      password: yup.string("ERROR: Need to fill in the password field!")
        .required("ERROR: Need to fill in the password field!")
        .min(6, "ERROR: Password must be at least 6 characters long!")
    });

    try {
      await schema.validate({ password });
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        message: err.errors
      });
      return false;
    }
  }


  const messageAddError = {
    type: "error",
    message: status.message
  }

  const messageAddSuccess = {
    type: "success",
    message: status.message
  }

  return (
    <div>
      <Menu />

      <h1>Edit Password</h1>
      <Link to="/view-profile"><button type="button">Profile</button></Link> {" "}

      {status.type === "redirectedWarning"
        ? <Navigate to="/login" state={messageAddError} />
        : ""}
      {status.type === "redirectedSuccess"
        ? <Navigate to="/view-profile" state={messageAddSuccess} />
        : ""}
      {status.type === "error" ? <p style={{ color: "#ff0000" }}>{status.message}</p> : ""}

      <hr />

      <form onSubmit={editUser}>

        <label>Name: {name} </label> <br />
        <label>E-mail: {email} </label><br /><br />

        <label>Password*: </label>
        <input
          type="password"
          name="password"
          placeholder="Password to access the system"
          autoComplete="on"
          onChange={text => setPassword(text.target.value)}
        /> <br /> <br />

        * Required field <br /><br />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}