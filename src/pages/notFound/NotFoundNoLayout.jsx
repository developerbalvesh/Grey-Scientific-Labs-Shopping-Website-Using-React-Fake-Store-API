import React from "react";
import styles from "./NotFound.module.css";
import PublicLayout from "../../layouts/PublicLayout";
import { Link } from "react-router-dom";

export default function NotFoundNoLayout({ title = "Page Not Found !" }) {
  return (
    <div className={styles.container}>
      <img src={"/notfound.gif"} alt="not found" />
      <h3>{title}</h3>
      <Link to={"/"}>Home</Link>
    </div>
  );
}
