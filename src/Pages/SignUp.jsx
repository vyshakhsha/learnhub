import React, { useState } from "react";
import "../Assets/Styles/Signup.scss";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Components/Firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);

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
  const [buttonState, setButtonState] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    userType: "Student",
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (buttonState) return;
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 4000);
    if (!formValues.name) {
      toast.error("Name is required", { position: "top-center" });
      return;
    }
    if (!formValues.email) {
      toast.error("Email is required", { position: "top-center" });
      return;
    }
    if (!formValues.password) {
      toast.error("Password is required", { position: "top-center" });
      return;
    }
    if (!formValues.userType) {
      toast.error("User Type is required", { position: "top-center" });
      return;
    }
    if (!validateEmail(formValues.email)) {
      toast.error("Invalid Email address", { position: "top-center" });
      return;
    }
    if (formValues.password.length < 8) {
      toast.error("Password is short !", { position: "top-center" });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formValues.email, formValues.password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          userName: formValues.name,
          email: formValues.email,
          password: formValues.password,
          userType: formValues.userType,
        });
        toast.success("User registered successfully !", {
          position: "top-center",
        });
        setFormValues({
          name: "",
          email: "",
          password: "",
          userType: "Student",
        });
      } else {
        console.log("User not authenticated.");
        toast.error("Error registering user", { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error registering user", { position: "top-center" });
      setButtonState(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="signup">
        <img src={require("../Assets/Images/Signup.png")} alt="Avatar" />
        <div className="signup-form">
          <p>Create Account</p>
          <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: "23ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-Text">Name</InputLabel>
            <OutlinedInput
              className="form-elements"
              id="outlined"
              label="Name"
              name="name"
              value={formValues.name}
              onChange={(e) =>{setFormValues({...formValues,[e.target.name]:e.target.value})}}
            />
          </FormControl>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={formValues.userType}
              onChange={(e) =>{setFormValues({...formValues,[e.target.name]:e.target.value})}}
            >
              <FormControlLabel
                value="Student"
                control={<Radio />}
                label="Student"
                name="userType"
                
              />
              <FormControlLabel
                value="Teacher"
                control={<Radio />}
                label="Teacher"
                name="userType"
                />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ m: 1, width: "23ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-Text">E-mail</InputLabel>
            <OutlinedInput
              className="form-elements"
              id="email"
              label="E-mail"
              name="email"
              value={formValues.email}
              onChange={(e) =>{setFormValues({...formValues,[e.target.name]:e.target.value})}}            
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "23ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              className="form-elements"
              id="password"
              name="password"
              value={formValues.password}
              type={showPassword ? "text" : "password"}
              onChange={(e) =>{ setFormValues({...formValues,[e.target.name]:e.target.value})}}                        
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
            Sign-Up
          </Button>
          </form>
          <p className="message">
            Already have an account ?<Button onClick={()=>navigate("/Login")}>Login</Button>
          </p>
        </div>
      </div>
    </>
  );
}
