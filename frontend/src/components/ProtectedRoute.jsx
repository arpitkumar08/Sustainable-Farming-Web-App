import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

export default function ProtectedRoute({ children }) {
  const { user, loginUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await api.get("/auth/me");
        console.log(res);
        
        loginUser(res.data); // save user
      } catch {
        return setLoading(false);
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" />;
}
