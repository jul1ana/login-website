import React from "react";

export const Dashboard = () => {

  const token = localStorage.getItem("token");

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Token: {token}</p>
    </div>
  );
}