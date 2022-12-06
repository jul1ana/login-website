import React, { useContext } from "react";
import { Context } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export const Dashboard = () => {

  const { authenticated, handleLogout } = useContext(Context);
  console.log("User status on dashboard page: " + authenticated);

  return (
    <div>
      <Link to="/dashboard">Dashboard</Link> <br />
      <Link to="/users">Users</Link> <br />
      <Link to="/view-profile">Profile</Link> <br />

      <h1>Dashboard</h1>
      <button type="button" onClick={handleLogout} >Exit</button>
    </div>
  );
}