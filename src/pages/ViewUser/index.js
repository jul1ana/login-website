import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

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
              type: "error",
              message: "ERROR: User not found!"
            });
          }
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

    getUser();
  }, [id]);

  const messageAdd = {
    type: status.type,
    message: status.message
  }

  return (
    <div>
      <Link to="/dashboard">Dashboard</Link> <br />
      <Link to="/users">Users</Link> <br />

      <h1>User Details</h1>
      <Link to="/users">List Users</Link> <br />

      {status.type === "error"
        ? <Navigate to="/users" state={messageAdd} />
        : ""}
      {status.type === "success" ? <p>{status.message}</p> : ""}

      <span>{data.id}</span> <br />
      <span>{data.name}</span> <br />
      <span>{data.email}</span> <br />
    </div>
  );
}