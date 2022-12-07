import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import * as yup from "yup";

import api from "../../config/configApi";

export const UpdatePassword = () => {

  const { key } = useParams();

  const [password, setPassword] = useState("");

  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  const updatePassword = async e => {
    e.preventDefault();

    if (!(await validate())) return;

    const headers = {
      "headers": {
        "Content-Type": "application/json",
      }
    }

    await api.put("/update-password/" + key, { password }, headers)
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
    const validateKey = async () => {
      const headers = {
        "headers": {
          "Content-Type": "application/json",
        }
      }

      await api.get("/validate-key-recover-pass/" + key, headers)
        .then((response) => {
          /*
          setStatus({
            type: "success",
            message: response.data.message
          });
          */
        }).catch((err) => {
          if (err.response) {
            setStatus({
              type: "redirectedDanger",
              message: err.response.data.message
            });
          } else {
            setStatus({
              type: "redirectedDanger",
              message: "ERROR: Try later!"
            });
          }
        });

    }

    validateKey();
  }, [key]);

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

  const messageAdd = {
    type: "error",
    message: status.message
  }

  const messageAddSuccess = {
    type: "success",
    message: status.message
  }

  return (
    <div>
      <h1>Update Password</h1>

      {status.type === "redirectedDanger"
        ? <Navigate to="/" state={messageAdd} />
        : ""}
      {status.type === "redirectedSuccess"
        ? <Navigate to="/" state={messageAddSuccess} />
        : ""}
      {status.type === "error" ? <p style={{ color: "#ff0000" }}>{status.message}</p> : ""}
      {status.type === "success" ? <p style={{ color: "green" }}>{status.message}</p> : ""}

      <form onSubmit={updatePassword}>
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

      - Remembered the password <Link to="/">click here</Link>

    </div>
  );
}