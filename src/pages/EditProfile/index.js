import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";

import { Menu } from "../../components/Menu";
import api from "../../config/configApi";

export const EditProfile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

    await api.put("/edit-profile", { name, email }, headers)
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
      email: yup.string("ERROR: Need to fill in the e-mail field!")
        .email("ERROR: Need to fill in the e-mail field!")
        .required("ERROR: Need to fill in the e-mail field!"),
      name: yup.string("ERROR: Need to fill in the name field!")
        .required("ERROR: Need to fill in the name field!")
    });

    try {
      await schema.validate({
        name,
        email,
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

      <h1>Edit Profile</h1>
      <Link to="/users"><button type="button">List</button></Link> {" "}

      {status.type === "redirectedWarning"
        ? <Navigate to="/login" state={messageAddError} />
        : ""}
      {status.type === "redirectedSuccess"
        ? <Navigate to="/view-profile" state={messageAddSuccess} />
        : ""}
      {status.type === "error" ? <p style={{ color: "#ff0000" }}>{status.message}</p> : ""}

      <hr />
      <form onSubmit={editUser}>
        <label>Name*: </label>
        <input
          type="text"
          name="name"
          placeholder="User's full name"
          value={name}
          onChange={text => setName(text.target.value)}
        /> <br /> <br />

        <label>E-mail*: </label>
        <input
          type="email"
          name="email"
          placeholder="Best user email"
          value={email}
          onChange={text => setEmail(text.target.value)}
        /> <br /> <br />

        * Required field <br /><br />

        <button type="submit">Save</button>
      </form>

    </div>
  );
}