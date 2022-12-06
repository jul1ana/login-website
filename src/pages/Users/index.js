import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { serviceDeleteUser } from "../../services/serviceDeleteUser";
import api from "../../config/configApi";
import { Menu } from "../../components/Menu";

export const Users = () => {

  const { state } = useLocation();

  const [data, setData] = useState([]);
  const [page, setPage] = useState("");
  const [lastPage, setLastPage] = useState("");

  const [status, setStatus] = useState({
    type: state ? state.type : "",
    message: state ? state.message : ""
  });

  const getUsers = async (page) => {
    if (page === undefined) {
      page = 1;
    }
    setPage(page);

    const headers = {
      "headers": {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }

    await api.get("/users/" + page, headers)
      .then((response) => {
        //recebendo os dados da API
        setData(response.data.users);
        setLastPage(response.data.lastPage);
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

  const deleteUser = async (idUser) => {
    const response = await serviceDeleteUser(idUser);

    if (response) {
      setStatus({
        type: response.type,
        message: response.message
      });
      getUsers();
    } else {
      setStatus({
        type: "error",
        message: "ERROR: Try later!"
      });
    }
  }

  return (
    <>
      <Menu />

      <h1>List Users</h1>
      <Link to="/add-user"><button type="button">Register</button></Link> <br />

      {status.type === "error" ? <p style={{ color: "#ff0000" }} >{status.message}</p> : ""}
      {status.type === "success" ? <p style={{ color: "green" }}>{status.message}</p> : ""}
      <hr />

      {data.map(user => (
        <div key={user.id}>
          <span>{user.id}</span> <br />
          <span>{user.name}</span> <br />
          <span>{user.email}</span> <br /><br />

          <Link to={"/view-user/" + user.id}><button type="button">View</button></Link>{" "}
          <Link to={"/edit-user/" + user.id}><button type="button">Edit</button></Link>{" "}
          <Link to={"#"}>
            <button type="button" onClick={() => deleteUser(user.id)}>Delete</button>
          </Link><br /> <br />
          <hr />
        </div>
      ))}

      {page !== 1 ?
        <button type="button" onClick={() => getUsers(1)}>First</button> :
        <button type="button" disabled>First</button>
      } {" "}

      {page !== 1 ?
        <button type="button" onClick={() => getUsers(page - 1)}>{page - 1}</button> :
        ""
      } {" "}

      <button type="button" disabled>{page}</button> {" "}

      {page + 1 <= lastPage ? <button type="button" onClick={() => getUsers(page + 1)}>{page + 1}</button> :
        ""
      } {" "}

      {page !== lastPage ?
        <button type="button" onClick={() => getUsers(lastPage)}>Last</button> :
        <button type="button" disabled>Last</button>
      } {" "}
    </>
  );
}