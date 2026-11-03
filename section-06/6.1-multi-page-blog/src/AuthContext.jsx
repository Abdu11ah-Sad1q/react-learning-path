import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // user is the username, or null if nobody is logged in
  const [user, setUser] = useState(localStorage.getItem("user"));

  // Any username works, but the password must be test123
  function login(username, password) {
    const name = username.trim();
    if (name !== "" && password === "test123") {
      setUser(name);
      localStorage.setItem("user", name);
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
