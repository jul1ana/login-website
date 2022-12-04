import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/configApi";

export const Users = () => {

  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  const getUsers = async () => {
    const headers = {
      "headers": {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }

    await api.get("/users", headers)
      .then((response) => {
        //recebendo os dados da API
        setData(response.data.users);
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
    getUsers();
  }, []);

  return (
    <>
      <Link to="/dashboard">Dashboard</Link> <br />
      <Link to="/users">Users</Link> <br />

      <h1>List Users</h1>
      <Link to="/add-user">Register</Link> <br /> <hr />

      {status.type === "error" ? <p>{status.message}</p> : ""}

      {data.map(user => (
        <div key={user.id}>
          <span>{user.id}</span> <br />
          <span>{user.name}</span> <br />
          <span>{user.email}</span> <br /> <hr />
        </div>
      ))}
    </>
  );
}