import React, { useState } from "react";
import styles from "./signin.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cross from "../../Image/close.png";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

const SignIn = ({
  onClose,
  setIsLoggedIn,
  setUserDetails,
  setLoginComponent,
  parent,
  setUserId,
}) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const backendUrl = `https://swip-troy-backend.vercel.app/api/v1/login`;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("Username:", userName);
    console.log("Password:", password);

    try {
      const res = await axios.post(
        "https://swip-troy-backend.vercel.app/api/v1/login",
        {
          username: userName,
          password: password,
        }
      );

      const data = res.data;
      if (data.success) {
        setIsLoggedIn(true);
        setUserId(data.user._id);
        Cookies.set("token", data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        onClose();
        setUserDetails(data.user);
        toast("Enjoy the stories!");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Wrong password!");
    }

    setUsername("");
    setPassword("");
  };

  const handleClose = () => {
    if (parent === "home") {
      onClose();
    } else if (parent === "individualStory") {
      setLoginComponent(false);
    }
  };

  const handleGoogleSsoSubmit = (email, password) => {
    const result = axios.post(backendUrl, {
            username: email,
            password: password,
          });

          result
            .then((res) => {
              const data = res.data;
              if (data.success) {
                setIsLoggedIn(true);
                setUserId(data.user._id);
                Cookies.set("token", data.token);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user._id);
                onClose();
                setUserDetails(data.user);
                toast("Enjoy the stories!");
              }
            })
            .catch((error) => {
              console.log(error.message);
              toast.error("Not Success registered");
            });

  }

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

      <GoogleLogin
        // className={register.googleLoginBtn}
        onSuccess={(credentialResponse) => {
          const userDetails = jwtDecode(credentialResponse.credential);
          console.log(userDetails);
          handleGoogleSsoSubmit(userDetails.email, userDetails.sub)
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />

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
