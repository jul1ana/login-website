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
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${(token)}`;
        setAuthenticated(true);
      };

      setLoading(false);
    }

    getLogin();
  }, []);

  async function signIn(userSituation) {
    setAuthenticated(true);
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Context.Provider value={{ authenticated, signIn }} >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider }