import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Register new user (store users in localStorage under "users")
  const register = async (email, password) => {
    try {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user already exists
      if (users.some((u) => u.email === email)) {
        return { success: false, message: "Email already registered" };
      }

      const newUser = {
        email,
        name: email.split("@")[0],
        password, // Store password in plain text for this demo ONLY (do NOT do this in production)
        token: "mock-token-" + Math.random().toString(36).substring(2),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Log user in after registration
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      return { success: false, message: "Registration failed" };
    }
  };

  // Login user if exists and password matches
  const login = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    // Load logged in user from localStorage on app start
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
