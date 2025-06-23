import React from 'react';
import styles from '../styles/utils/loader.module.css';
function Loader() {
  return (
    <div className={styles.loader}>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
</div>
  )
}

export default Loader
