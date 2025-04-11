import React, { useState } from "react";
import Header from "../components/Header";
import styles from './PublicLayout.module.css'

export default function PublicLayout({ children, className }) {
  return (
    <>
      <Header />
      <main className={`${styles.main} ${className}`}>{children}</main>
    </>
  );
}
