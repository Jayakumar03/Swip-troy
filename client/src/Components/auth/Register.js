import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import register from "./register.module.css";
import cross from "../../Image/close.png";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

const Register = ({ onClose, setIsLoggedIn, setUserDetails, setUserId }) => {
  const navigate = useNavigate();

  // backend url
  const backendUrl = `https://swip-troy-backend.vercel.app/api/v1/register`;
  console.log(backendUrl);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const handleFormSubmit = async (event) => {
    // event.preventDefault();

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
          setUserId(data.user._id);
          Cookies.set("token", data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user._id);
          onClose();
          setUserDetails(data.user);
          toast("Success registered");
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Not Success registered");
      });

    setUserName("");
    setPassword("");
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
  };

  const handleClose = () => {
    onClose();
  };


  return (
    <div className={register.background}>
      <div className={register.registerContainer}>
        <button className={register.crossBtn} onClick={handleClose}>
          <img src={cross} alt="" style={{ width: "15px", height: "15px" }} />
        </button>
        <p className={register.regiSwip}>Register to SwipTory</p>
        <form onSubmit={handleFormSubmit}>
          <label className={register.rlab1}>Username</label>
          <TextField
            className={register.regiform1}
            type="text"
            placeholder="Enter userName"
            value={userName}
            onChange={handleUsernameChange}
            InputProps={{
              style: { height: "30px", width: "200px" },
            }}
          />
          <label className={register.rlab2}>Password</label>
          <TextField
            className={register.regiform2}
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

          <button type="submit" className={register.regiBtn}>
            Register
          </button>
        </form>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const userDetails = jwtDecode(credentialResponse.credential);
            console.log(userDetails);

            handleGoogleSsoSubmit(userDetails.email, userDetails.sub);

            // handleFormSubmit();
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
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

export default Register;
