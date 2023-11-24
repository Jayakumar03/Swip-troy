import React, { useState } from "react";
import styles from "./signin.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cross from "../Image/close.png";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

const SignIn = ({ onClose, setIsLoggedIn,setUserDetails }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const backendUrl = `${process.env.REACT_APP_BACKEND_URL}login`;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("Username:", userName);
    console.log("Password:", password);

    const result = axios.post(backendUrl, {
      username: userName,
      password: password,
    });

    result
      .then((res) => {
        const data = res.data;
        if (data.success) {
          setIsLoggedIn(true);
          Cookies.set("token", data.token);
          localStorage.setItem("token", data.token);
          onClose();
          setUserDetails(data.user)
          toast("Enjoy the stories!");
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Wrong password!");
      });

    setUsername("");
    setPassword("");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.signinBackground}>
      <div className={styles.signinContainer}>
        <button className={styles.signinCrossBtn} onClick={handleClose}>
          <img src={cross} alt="" style={{ width: "15px", height: "15px" }} />
        </button>
        <p className={styles.signinSwip}>Sign In to SwipTory</p>
        <form onSubmit={handleFormSubmit}>
          <label className={styles.signinRlab1}>Username</label>
          <TextField
            className={styles.signinRegiform1}
            type="text"
            placeholder="Enter userName"
            value={userName}
            onChange={handleUsernameChange}
            InputProps={{
              style: { height: "30px", width: "200px" },
            }}
          />
          <label className={styles.signinRlab2}>Password</label>
          <TextField
            className={styles.signinRegiform2}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  style={{ height: "5px", width: "5px" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
              style: { height: "30px", width: "200px" },
            }}
          />
          <button type="submit" className={styles.signinRegiBtn}>
            Sign In
          </button>
        </form>
        <p className={styles.signinError}>Please enter valid userName</p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default SignIn;