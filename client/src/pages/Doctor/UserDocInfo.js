import React, { useEffect, useState } from "react";
import DocNavBar from "../../components/Doctor/DocNavBar";
import styles from "../../styles/page/UserInfo.module.css";
import { useNavigate } from "react-router-dom";

function UserDocInfo() {
  const navigate = useNavigate();
  const [receptData, setReceptData] = useState({});
  useEffect(() => {
    const localData = localStorage.getItem("docData");
    if (!localData) return navigate("/");
    setReceptData(JSON.parse(localData));
  }, [navigate]);
  return (
    <>
      <DocNavBar />
      <div className={styles.wrapper}>
        <div className={styles.container}>
            <h1>Hi ! { receptData.data && (receptData.data.data.name)}</h1>
            <p className={styles.subHead}>Doctor</p>
            <h2>Name: {receptData.data && receptData.data.data.name}</h2>
            <h2>Age: {receptData.data && receptData.data.data.age }</h2>
            <h2>Gender: {receptData.data && receptData.data.data.gender}</h2>
            <h2>Ph No: {receptData.data && receptData.data.data.phno}</h2>
            <h2>Email: {receptData.data && receptData.data.data.email}</h2>
        </div>
      </div>
    </>
  );
}

export default UserDocInfo;
