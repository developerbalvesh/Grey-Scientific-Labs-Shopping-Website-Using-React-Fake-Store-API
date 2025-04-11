import React from "react";
import styles from "./NotFound.module.css";
import PublicLayout from "../layouts/PublicLayout";

export default function NotFound() {
  return (
    <PublicLayout>
      <div className={styles.container}>
        <h3>Page Not Found !</h3>
      </div>
    </PublicLayout>
  );
}
