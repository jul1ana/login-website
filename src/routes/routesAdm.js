import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Context } from "../Context/AuthContext";
import { AddUser } from "../pages/AddUser";
import { Dashboard } from "../pages/Dashboard";
import { EditUser } from "../pages/EditUser";
import { EditUserPassword } from "../pages/EditUserPassword";
import { Login } from "../pages/Login";
import { Users } from "../pages/Users";
import { ViewUser } from "../pages/ViewUser";

function CustomRoute({ children, redirectTo }) {
  const { authenticated } = useContext(Context);

  return authenticated ? children : <Navigate to={redirectTo} />
}

export default function RoutesAdm() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/dashboard" element={<CustomRoute redirectTo="/"><Dashboard /></CustomRoute>} />
      <Route exact path="/users" element={<CustomRoute redirectTo="/"><Users /></CustomRoute>} />
      <Route exact path="/add-user" element={<CustomRoute redirectTo="/"><AddUser /></CustomRoute>} />
      <Route exact path="/view-user/:id" element={<CustomRoute redirectTo="/"><ViewUser /></CustomRoute>} />
      <Route exact path="/edit-user/:id" element={<CustomRoute redirectTo="/"><EditUser /></CustomRoute>} />
      <Route exact path="/edit-user-password/:id" element={<CustomRoute redirectTo="/"><EditUserPassword /></CustomRoute>} />
    </Routes>
  );
}