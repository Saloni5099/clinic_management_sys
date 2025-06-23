// SignOut.js
import React from "react";
import { useNavigate } from "react-router-dom";
// import styles from '../styles/button.module.scss'

const SignOut = () => {
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <button className={styles.button} onClick={handleSignout}>
      Sign out
    </button>
  );
};

export default SignOut;