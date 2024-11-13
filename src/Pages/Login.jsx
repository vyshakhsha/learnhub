import React, { useState } from "react";
import "../Assets/Styles/Login.scss";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { toast, ToastContainer } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Components/Firebase";
import {  useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = React.useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [buttonState, setButtonState] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailRegex.test(email)) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (buttonState) return;
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 4000);
    if (!formValues.email) {
      toast.error("Email is required", { position: "top-center" });
      return;
    }
    if (!formValues.password) {
      toast.error("Password is required", { position: "top-center" });
      return;
    }
    if (!validateEmail(formValues.email)) {
      toast.error("Invalid Email address", { position: "top-center" });
      return;
    }
    try {
      await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      toast.success("User logged in successfully !", {
        position: "top-center",
      });
      setFormValues({
        email: "",
        password: ""
      });
      window.location.href="/Home"
    } catch (error) {
      console.log(error);
      toast.error("Error while login", { position: "top-center" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login">
        <img src={require("../Assets/Images/Login.png")} alt="Avatar" />
        <div className="login-form">
          <p>Login</p>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, width: "23ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-Text">E-mail</InputLabel>
              <OutlinedInput
                className="form-elements"
                id="outlined"
                label="E-mail"
                name="email"
                value={formValues.email}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </FormControl>
            <br></br>
            <FormControl sx={{ m: 1, width: "23ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                className="form-elements"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formValues.password}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <br></br>
            <Button
              variant="contained"
              type="submit"
              sx={{
              width: "230px",
              marginTop: "8px",
              "&:disabled": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
            disabled={buttonState}
            >
              Login
            </Button>
          </form>
          <p className="message">
            Don't have an account ?<Button  onClick={()=>navigate("/SignUp")}>Sign-Up</Button>
          </p>
        </div>
      </div>
    </>
  );
}
