import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./logout.module.css";
// { userDetails }
const Logout = () => {
  const navigate = useNavigate();

  const backendurl = `https://swip-troy-backend.vercel.app/api/v1/logout`;

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
    navigate("/");
  };

  return (
    <div className={styles.logoutContainer}>
      <p className={styles.logUsername}>
        {/* {userDetails.username}  */}
        Hello
      </p>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
