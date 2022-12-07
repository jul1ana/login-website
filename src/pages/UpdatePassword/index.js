import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import api from "../../config/configApi";

export const UpdatePassword = () => {

  const { key } = useParams();

  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  useEffect(() => {
    const validateKey = async () => {
      const headers = {
        "headers": {
          "Content-Type": "application/json",
        }
      }

      await api.get("/validate-key-recover-pass/" + key, headers)
        .then((response) => {
          setStatus({
            type: "success",
            message: response.data.message
          });
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

  const messageAdd = {
    type: "error",
    message: status.message
  }

  return (
    <div>
      <h1>Update Password</h1>

      {status.type === "redirectedDanger"
        ? <Navigate to="/" state={messageAdd} />
        : ""}
      {status.type === "error" ? <p style={{ color: "#ff0000" }}>{status.message}</p> : ""}
      {status.type === "success" ? <p style={{ color: "green" }}>{status.message}</p> : ""}

    </div>
  );
}