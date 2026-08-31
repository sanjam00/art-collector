// authorization (where the token actually lives)

import { createContext, useContext, useState } from "react";
import { apiFetch } from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  async function login(username, password) {
    const data = await apiFetch('/login', null, {
      method: 'POST',
      body: JSON.stringify({username, password}),
    });
    setToken(data.token);
    setUser(data.user);
    return data;
  }

  async function signup(username, email, password, passwordConfirmation) {
    const data = await apiFetch('/signup', null, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    });
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return(
    <AuthContext.Provider value={{ token, user, login, signup, logout }} >
      {children}
    </AuthContext.Provider>
  );
}

// this is what gets called in other functions to actually use the AuthContext
export function useAuth() {
  return useContext(AuthContext)
}