import React from "react";
import "../Assets/Styles/Signup.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SignUp() {
  return (
    <>
      <div className="signup">
        <img src={require("../Assets/Images/Signup.png")} alt="Avatar" />
        <div className="signup-form">
          <p>Create Account</p>
          <TextField
            className="form-elements"
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
          />
          <br></br>
          <TextField
            className="form-elements"
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <br></br>
          <Button variant="contained" sx={{ width: "34%" }}>
            Sign-Up
          </Button>
          <p className="message">
            Already have an account ?<Button href="#text-buttons">Login</Button>
          </p>
        </div>
      </div>
    </>
  );
}
