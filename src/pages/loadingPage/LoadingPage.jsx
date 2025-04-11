import React from 'react'
import styles from "./LoadingPage.module.css"
import { ClockLoader } from 'react-spinners'

export default function LoadingPage() {
  return (
    <div className={styles.loading}>
      <ClockLoader color="#575757" />
    </div>
  )
}
