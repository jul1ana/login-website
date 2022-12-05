import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../config/configApi";

export const Users = () => {

  const { state } = useLocation();

  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: state ? state.type : "",
    message: state ? state.message : ""
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

      {status.type === "error" ? <p style={{ color: "#ff0000" }} >{status.message}</p> : ""}
      {status.type === "success" ? <p style={{ color: "green" }}>{status.message}</p> : ""}

      {data.map(user => (
        <div key={user.id}>
          <span>{user.id}</span> <br />
          <span>{user.name}</span> <br />
          <span>{user.email}</span> <br /><br />

          <Link to={"/view-user/" + user.id}><button type="button">View</button></Link><br /> <br />
          <Link to={"/edit-user/" + user.id}><button type="button">Edit</button></Link><br /> <br /><hr />
        </div>
      ))}
    </>
  );
}