import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

export default function ProtectedRoute({ children }) {

  // Log what useContext returns
  const contextValue = useContext(AuthContext);
  console.log("AuthContext from useContext:", contextValue);

  // Destructure AFTER logging so the error shows clearly
  const { user, loginUser } = contextValue || {};
  console.log("user:", user, "loginUser:", loginUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ProtectedRoute mounted. Starting auth check...");

    async function checkAuth() {
      try {
        const res = await api.get("/auth/me");
        console.log("GET /auth/me response:", res);

        if (loginUser) {
          console.log("Calling loginUser() with:", res.data);
          loginUser(res.data);
        } else {
          console.warn("loginUser is NOT defined! Context may be null.");
        }
      } catch (err) {
        console.error("Error in checkAuth:", err);
        setLoading(false);
        return;
      }
      setLoading(false);
    }

    checkAuth();
  }, []);

  console.log("Loading state:", loading);

  if (loading) return <p>Loading...</p>;

  console.log("Final user before render:", user);

  return user ? children : <Navigate to="/login" />;
}
