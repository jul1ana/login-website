import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { Menu } from "../../components/Menu";
import api from "../../config/configApi";

export const ViewProfile = () => {

  const [data, setData] = useState("");

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

      await api.get("/view-profile", headers)
        .then((response) => {
          if (response.data.user) {
            setData(response.data.user);
          } else {
            setStatus({
              type: "redirectedError",
              message: "ERROR: Profile not found!"
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
        })
    }

    getUser();
  }, []);

  const messageAddError = {
    type: "error",
    message: status.message
  }

  return (
    <div>
      <Menu />

      <h1>Profile</h1>

      {status.type === "redirectedError"
        ? <Navigate to="/login" state={messageAddError} />
        : ""}

      {status.type === "success" ? <p>{status.message}</p> : ""}
      <hr />

      <span>{data.id}</span> <br />
      <span>{data.name}</span> <br />
      <span>{data.email}</span> <br />
    </div>
  );
}