import React, { useState } from "react";
import Header from "../components/Header";
import styles from './PublicLayout.module.css'

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
}
