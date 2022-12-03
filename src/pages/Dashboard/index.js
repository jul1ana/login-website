import React, { useContext } from "react";
import { Context } from "../../Context/AuthContext";

export const Dashboard = () => {

  const token = localStorage.getItem("token");

  const { authenticated } = useContext(Context);
  console.log("User status on dashboard page: " + authenticated);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Token: {token}</p>
    </div>
  );
}