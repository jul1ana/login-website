import React, { useState } from "react";

import api from "../../config/configApi";

export const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  //recuperando o valor do input
  const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

  const loginSubmit = async e => {
    e.preventDefault();
    // console.log(user.email);
    // console.log(user.password);

    // conexão com API
    const headers = {
      "Content-Type": "application/json"
    }

    await api.post("/login", user, { headers })
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else {
          console.log("Error: try later");
        }
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginSubmit}>
        <label>User: </label>
        <input type="text" name="email" placeholder="Enter your email" onChange={valueInput} /> <br /><br />

        <label>Password: </label>
        <input type="password" name="password" placeholder="Enter your password" onChange={valueInput} /> <br /><br />

        <button type="submit">Acessar</button>
      </form>
    </div>
  );
};