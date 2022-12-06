import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import { serviceDeleteUser } from "../../services/serviceDeleteUser";
import api from "../../config/configApi";

export const ViewUser = (props) => {

  const [data, setData] = useState("");
  const { id } = useParams();

  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

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
            setData(response.data.user);
          } else {
            setStatus({
              type: "redirectedError",
              message: "ERROR: User not found!"
            });
          }
        }).catch((err) => {
          if (err.response) {
            setStatus({
              type: "redirectedError",
              message: err.response.data.message
            });
          } else {
            setStatus({
              type: "redirectedError",
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
          type: response.type,
          message: response.message
        });
      }
    } else {
      setStatus({
        type: "redirectedError",
        message: "ERROR: Try later!"
      });
    }
  }

  const messageAddSuccess = {
    type: "success",
    message: status.message
  }

  const messageAddError = {
    type: "error",
    message: status.message
  }

  return (
    <div>
      <Link to="/dashboard">Dashboard</Link> <br />
      <Link to="/users">Users</Link> <br />

      <h1>User Details</h1>
      <Link to="/users"><button type="button">List</button></Link>{" "}
      <Link to={"/edit-user/" + data.id}><button type="button">Edit</button></Link>{" "}
      <Link to={"#"}><button type="button" onClick={() => deleteUser(data.id)}>Delete</button></Link>{" "}

      {status.type === "redirectedError"
        ? <Navigate to="/users" state={messageAddError} />
        : ""}

      {status.type === "redirectedSuccess"
        ? <Navigate to="/users" state={messageAddSuccess} />
        : ""}

      {status.type === "success" ? <p>{status.message}</p> : ""}
      <hr />

      <span>{data.id}</span> <br />
      <span>{data.name}</span> <br />
      <span>{data.email}</span> <br />
    </div>
  );
}