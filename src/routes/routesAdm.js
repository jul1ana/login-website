import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Context } from "../Context/AuthContext";
import { AddUser } from "../pages/AddUser";
import { AddUserLogin } from "../pages/AddUserLogin";
import { Dashboard } from "../pages/Dashboard";
import { EditProfile } from "../pages/EditProfile";
import { EditProfilePassword } from "../pages/EditProfilePassword";
import { EditUser } from "../pages/EditUser";
import { EditUserPassword } from "../pages/EditUserPassword";
import { Login } from "../pages/Login";
import { RecoverPassword } from "../pages/RecoverPassword";
import { Users } from "../pages/Users";
import { ViewProfile } from "../pages/ViewProfile";
import { ViewUser } from "../pages/ViewUser";

function CustomRoute({ children, redirectTo }) {
  const { authenticated } = useContext(Context);

  return authenticated ? children : <Navigate to={redirectTo} />
}

export default function RoutesAdm() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/add-user-login" element={<AddUserLogin />} />
      <Route exact path="/recover-password" element={<RecoverPassword />} />

      <Route exact path="/dashboard" element={<CustomRoute redirectTo="/"><Dashboard /></CustomRoute>} />
      <Route exact path="/users" element={<CustomRoute redirectTo="/"><Users /></CustomRoute>} />
      <Route exact path="/add-user" element={<CustomRoute redirectTo="/"><AddUser /></CustomRoute>} />
      <Route exact path="/view-user/:id" element={<CustomRoute redirectTo="/"><ViewUser /></CustomRoute>} />
      <Route exact path="/edit-user/:id" element={<CustomRoute redirectTo="/"><EditUser /></CustomRoute>} />
      <Route exact path="/edit-user-password/:id" element={<CustomRoute redirectTo="/"><EditUserPassword /></CustomRoute>} />
      <Route exact path="/view-profile" element={<CustomRoute redirectTo="/"><ViewProfile /></CustomRoute>} />
      <Route exact path="/edit-profile" element={<CustomRoute redirectTo="/"><EditProfile /></CustomRoute>} />
      <Route exact path="/edit-profile-password" element={<CustomRoute redirectTo="/"><EditProfilePassword /></CustomRoute>} />
    </Routes>
  );
}