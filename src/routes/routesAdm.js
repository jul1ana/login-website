import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Context } from "../Context/AuthContext";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Users } from "../pages/Users";

function CustomRoute({ children, redirectTo }) {
  const { authenticated } = useContext(Context);

  return authenticated ? children : <Navigate to={redirectTo} />
}

export default function RoutesAdm() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<CustomRoute redirectTo="/"><Dashboard /></CustomRoute>} />
      <Route path="/users" element={<CustomRoute redirectTo="/"><Users /></CustomRoute>} />
    </Routes>
  );
}