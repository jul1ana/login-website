import React, { createContext, useEffect, useState } from "react";

import api from "../config/configApi";

const Context = createContext();

function AuthProvider({ children }) {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLogin = async () => {
      const token = localStorage.getItem("token");

      // verificando se o usuario tem o token, se tiver entao o usuario esta logado
      if (token && validateUser()) {
        api.defaults.headers.Authorization = `Bearer ${(token)}`;
        setAuthenticated(true);
      };

      setLoading(false);
    }

    getLogin();
  }, []);

  const validateUser = async () => {
    const valueToken = localStorage.getItem("token");

    const headers = {
      "headers": {
        "Authorization": "Baerer " + valueToken
      }
    }

    await api.get("/validate-token", headers)
      .then(() => {
        return true; //token valido
      }).catch(() => {
        setAuthenticated(false);
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = undefined;
        return false;
      })
  }

  async function signIn(userSituation) {
    setAuthenticated(true);
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Context.Provider value={{ authenticated, signIn, handleLogout }} >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider }