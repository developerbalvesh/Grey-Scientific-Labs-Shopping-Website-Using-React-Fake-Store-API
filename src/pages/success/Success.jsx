import React from "react";
import styles from "./Success.module.css";
import PublicLayout from "../../layouts/PublicLayout";
import { Link } from "react-router-dom";

export default function Success({ title = "Order Placed !" }) {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
    </div>
  );
}
