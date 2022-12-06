import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import api from "../../config/configApi";
import { serviceDeleteUser } from "../../services/serviceDeleteUser";

export const EditUser = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { id } = useParams();

  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  const editUser = async e => {
    e.preventDefault();

    const headers = {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }

    await api.put("/user", { id, name, email, password }, headers)
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

      await api.get("/user/" + id, headers)
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
  }, [id]);

  const deleteUser = async (idUser) => {
    const response = await serviceDeleteUser(idUser);

    if (response) {
      if (response.type === "success") {
        setStatus({
          type: "redirectedSuccess",
          message: response.message
        });
      } else {
        setStatus({
          type: "error",
          message: response.message
        });
      }
    } else {
      setStatus({
        type: "error",
        message: "ERROR: Try later!"
      });
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
      <Link to="/dashboard">Dashboard</Link> <br />
      <Link to="/users">Users</Link> <br />

      <h1>Edit User</h1>
      <Link to="/users"><button type="button">List</button></Link> {" "}
      <Link to={"/view-user/" + id}><button type="button">View</button></Link> {" "}
      <Link to={"#"}>
        <button type="button" onClick={() => deleteUser(id)}>Delete</button>
      </Link><br /> <br />

      {status.type === "redirectedWarning"
        ? <Navigate to="/users" state={messageAddError} />
        : ""}
      {status.type === "redirectedSuccess"
        ? <Navigate to="/users" state={messageAddSuccess} />
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