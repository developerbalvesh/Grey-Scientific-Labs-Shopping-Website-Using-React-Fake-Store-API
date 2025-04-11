import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../loadingPage/LoadingPage";
import PublicLayout from "../../layouts/PublicLayout";
import { publicCommunication } from "../../communication/publicCommunication";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (username && password) {
      const token = await publicCommunication.login({ username, password });
      if (token) {
        login(token);
        navigate("/");
      }
      setLoading(false);
    } else {
      toast.error("Please fill all the fields");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    } else {
      setLoading(true);
      navigate("/");
    }
  }, [location, location.pathname]);

  if (loading) {
    return (
      <PublicLayout>
        <LoadingPage />
      </PublicLayout>
    );
  } else
    return (
      <PublicLayout className={styles.outer}>
        <div className={styles.container}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              <span>Username</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter Username"
                required
              />
            </label>
            <label>
              <span>Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
                required
              />
            </label>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </PublicLayout>
    );
}
