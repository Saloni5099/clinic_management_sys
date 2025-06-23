import React, { useState, useEffect } from "react";
import styles from "../../styles/page/ReceptionistDash.module.css";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function ReceptionistDash() {
  const api = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [receptData, setReceptData] = useState({});
  const [totPat, setTotpat] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const localData = await localStorage.getItem("receptData");
        if (!localData) {
          navigate("/");
          // console.log("inside localData")
          return;
        }
        
        const parsedLocalData = JSON.parse(localData);
        
        setReceptData((prevReceptData) => {
          if (
            JSON.stringify(prevReceptData) !== JSON.stringify(parsedLocalData)
          ) {
            return parsedLocalData;
          }
          return prevReceptData;
        });

        //!comment
        // console.log(parsedLocalData.data._id); // id of staff sending to backend receptdDataReader file

        if (parsedLocalData.data) {
          const response = await axios.post(
            "http://localhost:3006/api/recept/retrecept",
            // `${api}/api/recept/retrecept`,
            { id: parsedLocalData.data._id } // id of staff
          );

          //! comment
          console.log(response.data.data);

          setData((prevData) => {
            if (
              JSON.stringify(prevData) !== JSON.stringify(response.data.data)
            ) {
              return response.data.data;
            }
            return prevData;
          });
          setTotpat(response.data.data.doctor.length);
        }

      } catch (error) {
        errorToast("Error while getting data")
      }
    };

    fetchData();
  }, [navigate, receptData, data,api]);
  // const success = (value) => toast.success(value);
  const errorToast = (value) => toast.error(value);

  return (
    <>
      <Toaster />
      <NavBar />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Dashboard</h1>
            <div className={styles.patAttend}>
              <h2>No. Of Patients: {totPat}</h2>
            </div>
          </div>
          <h1 style={{ textAlign: "center" }}>
            All Patients And Doctor Records
          </h1>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name Of Doctor</th>
                  <th>Name Of Patient</th>
                  <th>Ph No</th>
                  <th>Time</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className={styles.patient}>
                {data.doctor &&
                  data.doctor.map((item, index) => {
                    let convertedDate = new Date(
                      item.createdAt
                    ).toLocaleString();
                    return (
                      <tr key={index} className={styles.patDetails}>
                        <td>{index + 1}</td>
                        <td>{item.docObjectId.name}</td>
                        <td>{item.patId.name}</td>
                        {/* <td>patient-1</td> */}
                        <td>{item.patId.phno}</td>
                        {/* <td>852585285</td> */}
                        <td>{convertedDate}</td>
                        <td>{item.amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceptionistDash;
