import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // handle login and logout

  const login = (token) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken("");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  // Cart actions

  const addToCart = (obj) => {
    setCart((prev) => {
      const newArr = [...prev, obj];
      localStorage.setItem("cart", JSON.stringify(newArr));
      return newArr;
    });
  };

  const removeCart = (id) => {
    setCart((prev) => {
      const newArr = prev.filter((c) => c.id !== id);
      localStorage.setItem("cart", JSON.stringify(newArr));
      return newArr;
    });
  };

  const clearCart=()=>{
    setCart([])
  }

  // setting localstorage data when page loads

  useEffect(() => {
    const raw = localStorage.getItem("token");
    if (raw) {
      setToken(raw);
      setIsAuthenticated(true);
    }
    const rawCart = localStorage.getItem("cart");
    if (rawCart) {
      setCart(JSON.parse(rawCart));
    }
  }, []);

  // Search
  useEffect(()=>{
    setSearch("")
  },[location])

  // useEffect(()=>{
  //   if(location.pathname!=="/"){
  //     navigate("/");
  //   }
  // },[search])

  // setting values for global context
  const value = {
    token,
    cart,
    login,
    logout,
    addToCart,
    removeCart,
    isAuthenticated,
    search, 
    setSearch,
    clearCart
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
