import React from "react";
import "../Assets/Styles/Landing.scss";
import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";

export default function Landing() {
  return (
    <>
      <div className="hero-section">
        <div className="hero-header">
          <p className="title">LearnHub</p>
          <p className="intro">Ignite Your Passion for Learning</p>
          <p className="message">
            Discover top courses at Learn Hub. Learn, grow, and succeed on your
            path to excellence
          </p>
          <Button variant="contained">Get Started</Button>
          <p>
            Have an account ? <Button href="#text-buttons">Login</Button>
          </p>
        </div>
        <div className="hero-image">
          <img src={require("../Assets/Images/hero.png")} alt="Avatar" />
        </div>
      </div>
    </>
  );
}
