import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import styles from "../../styles/page/BillingAmount.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";
import { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function BillingAmount() {
  const api = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [docName, setDocname] = useState("");
  const [patNo, setPatno] = useState("");
  const [amount, setAmount] = useState("");
  const [patName, setPatName] = useState("");
  const [patAge, setPatage] = useState("");
  const prescriptionsFromServer = [];
  const [prescription, setPrescription] = useState(prescriptionsFromServer);
  const [isCheck, setIsCheck] = useState(false);
  const [receptData, setReceptData] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [idNo, setIDno] = useState(false);
  useEffect(() => {
    const localData = localStorage.getItem("receptData");
    if (!localData) return navigate("/");
    setReceptData(JSON.parse(localData));
  }, [navigate]);
  const checkValid = async (e) => {
    try {
      e.preventDefault();
      if (!patNo) return errorToast("Enter Patient Number");
      setIsLoad(true);
      const patDetails = await axios.post(
        "http://localhost:3006/api/recept/retrpat",
        // `${api}/api/recept/retrpat`,
        { phno: patNo }
      );
      setPatName(patDetails.data.name);
      setPatage(patDetails.data.age);
      setIsCheck(true);
      const fetch = await axios.post(
        `http://localhost:3006/api/docs/rettoken`,
        // `${api}/api/docs/rettoken`,
        { patNo: patNo }
      );
      setPrescription(fetch.data.data.patient.combinedData);
      setIsLoad(false);
      success("Loaded Successfully");
    } catch (err) {
      errorToast("Invalid Patient Number");
      setIsLoad(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (isCheck === false)
        return errorToast("Please Enter The Above Credentials");
      if (!amount) return;
      setIsLoad(true);
      await axios.post(
        "http://localhost:3006/api/recept/bill",
        // `${api}/api/recept/bill`,
        {
          patphno: patNo,
          phno: receptData.data.phno,
          name: docName,
          amount: amount,
        }
      );
      setIsCheck(false);
      setIsLoad(false);
      success("Submitted Successfully");
    } catch (err) {
      setIsLoad(false);
      errorToast("Internal Server Error");
    }
  };
  const checkID = async (e) => {
    try {
      if (!idNo) return errorToast("Enter The Token ID");
      e.preventDefault();
      setIsLoad(true);
      const fetch = await axios.post(
        "http://localhost:3006/api/docs/rettoken",
        // `${api}/api/docs/rettoken`,
        { id: idNo }
      );
      setIsCheck(true);
      setPatName(fetch.data.data.patient.name);
      setPatno(fetch.data.data.patient.phno);
      setPatage(fetch.data.data.patient.age);
      setPrescription(fetch.data.data.patient.combinedData);
      setIsLoad(false);
    } catch (err) {
      setIsCheck(false);
      setIsLoad(false);
      errorToast("Token ID Is Invalid");
    }
  };
  const success = (value) => toast.success(value);
  const errorToast = (value) => toast.error(value);

  return (
    <>
      <NavBar />
      <Toaster />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1>Billing</h1>
            {isLoad && (
              <div className={styles.loader_wrapper}>
                <Loader />
              </div>
            )}
          <form className={styles.formContainer}>
            {!isLoad && (
              <>
                <div className={styles.formGroup}>
                  <label>Name Of The Patient</label>
                  <input
                    type="text"
                    disabled
                    placeholder="Enter The Phone Number"
                    value={patName}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Age</label>
                  <input
                    type="number"
                    disabled
                    placeholder="Enter The Phone Number"
                    value={patAge}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Name Of The Doctor</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter The Name Of The Doctor"
                    onChange={(e) => setDocname(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Token ID</label>
                  <input
                    type="number"
                    placeholder="Enter ID"
                    value={idNo}
                    onChange={(e) => setIDno(e.target.value)}
                  />
                </div>
                <div style={{ display: "grid", placeContent: "center" }}>
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={checkID}
                    style={{ width: "200%" }}
                  >
                    Check ID
                  </button>
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number Of The Patient</label>
                  <input
                    type="number"
                    required
                    placeholder="If Token ID Entered Then It Is Optional"
                    onChange={(e) => setPatno(e.target.value)}
                  />
                </div>
                <div style={{ display: "grid", placeContent: "center" }}>
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={checkValid}
                    style={{ width: "200%" }}
                  >
                    Check
                  </button>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Previous Consultations</label>
                  {prescription &&
                    prescription.map((data, index) => {
                      return (
                        <li key={index}>
                          {data.doctorName}-{data.prescription}
                        </li>
                      );
                    })}
                </div>
                <div className={styles.formGroup}>
                  <label>Amount</label>
                  <input
                    type="number"
                    required
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div style={{ display: "grid", placeContent: "center" }}>
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={handleSubmit}
                    style={{ width: "200%" }}
                  >
                    <p>Submit</p>
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default BillingAmount;
