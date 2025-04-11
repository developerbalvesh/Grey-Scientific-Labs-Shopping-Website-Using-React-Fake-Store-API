import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const navRef = useRef(null);
  const { search, setSearch, cart, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (show && navRef.current && !navRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>
          <Link to={"/"}>Logo</Link>
        </h1>
        <FaBars onClick={() => setShow(true)} />
      </div>
      {location.pathname === "/" && (
        <label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search Here..."
          />
          <button className={styles.search}>
            <CiSearch />
          </button>
        </label>
      )}
      <nav ref={navRef} className={show ? styles.show : ""}>
        <ImCross onClick={() => setShow(false)} />
        <NavLink
          className={location.pathname === "/" ? styles.active : ""}
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={`${styles.cart} ${
            location.pathname === "/cart" ? styles.active : ""
          }`}
          to={"/cart"}
        >
          Cart
          {cart.length > 0 && <span>{cart.length}</span>}
        </NavLink>
        {isAuthenticated ? (
          <button className={styles.logout} onClick={logout}>
            Logout
          </button>
        ) : (
          <NavLink
            className={location.pathname === "/login" ? styles.active : ""}
            to={"/login"}
          >
            <button className={styles.login}>Login</button>
          </NavLink>
        )}
      </nav>
    </header>
  );
}
